import { Request, Response } from 'express';
import { Assistant, ThreadMessage, ThreadRun } from '@azure/openai-assistants';
import { Document, Schema } from 'mongoose';
import { BotModel, ConversationModel, IBot, MsgModel } from '../models/chat';
import { createStoryAssistant } from './openaiController';
import { client } from '../utils/openaiUtils';
import { beginningPrompt, continuingPrompt } from '../utils/promptUtils';
import { CustomError, handleErrorResponse } from '../utils/errorUtils';

// Operations
async function createBot(assistant: Assistant, targetAge: number) {
  const bot = new BotModel({
    assistantId: assistant.id,
    name: assistant.name,
    targetAge: targetAge,
    instructions: assistant.instructions,
    createdAt: assistant.createdAt,
  });
  await bot.save();
  return bot;
}

async function updateBot(
  bot: Document<unknown, {}, IBot> & IBot & { _id: Schema.Types.ObjectId },
  assistant: Assistant,
  targetAge: number
) {
  Object.assign(bot, {
    assistantId: assistant.id,
    name: assistant.name,
    targetAge: targetAge,
    instructions: assistant.instructions,
    createdAt: assistant.createdAt,
  });
  await bot.save();
  return bot;
}

async function createConversation(run: ThreadRun, userId: string, topic: string) {
  const conversation = await new ConversationModel({
    threadId: run.threadId,
    userId,
    assistantId: run.assistantId,
    createdAt: run.createdAt,
    updatedAt: run.createdAt,
    topic,
  });
  await conversation.save();
  return conversation;
}

async function createMsg(message: ThreadMessage) {
  const msg = await new MsgModel({
    messageId: message.id,
    threadId: message.threadId,
    role: message.role,
    text: message.content[0].type === 'text' && message.content[0].text.value,
    createdAt: message.createdAt,
  });
  await msg.save();
  return msg;
}

async function runAndStoreMsgs(run: ThreadRun) {
  while (run.status === 'queued' || run.status === 'in_progress') {
    run = await client.getRun(run.threadId, run.id);
  }
  ///////////////////////////////////////////////////////////////////////
  const { data } = await client.listMessages(run.threadId);
  const msgs = [];
  for (let i = 1; i >= 0; i--) {
    const msg = await createMsg(data[i]);
    msgs.push(msg);
  }
  return msgs;
}

// Controllers
export const botController = {
  async getAllBots(req: Request, res: Response) {
    try {
      const bots = await BotModel.find();
      res.json(bots);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async createOrGetBotByAge(req: Request, res: Response) {
    const age = parseInt(req.body.age as string, 10) || 5;
    const targetAge = Math.min(12, Math.max(3, age));
    try {
      let bot = await BotModel.findOne({ targetAge });
      if (!bot) {
        const assistant = await createStoryAssistant(client, age);
        bot = await createBot(assistant, targetAge);
      } else {
        try {
          await client.getAssistant(bot?.assistantId);
        } catch (err: any) {
          const assistant = await createStoryAssistant(client, age);
          bot = await updateBot(bot, assistant, targetAge);
        }
      }
      return res.json(bot);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async deleteBot(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const botResult = await BotModel.deleteOne({ assistantId: id });
      const assistantResult = await client.deleteAssistant(id);
      res.json({ botResult, assistantResult });
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },
};

export const conversationController = {
  async getAllConversationsByUser(req: Request, res: Response) {
    // TODO: will retrieve userId in req.user when applying auth middleware
    const { userId } = req.query;
    try {
      const conversations = await ConversationModel.find({ userId });
      res.json(conversations);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async getConversation(req: Request, res: Response) {
    const { threadId } = req.params;
    try {
      const conversation = await ConversationModel.findOne({ threadId });
      if (!conversation) {
        throw new CustomError(404, 'ConversationNotFound', `No conversation found with threadId '${threadId}'`);
      }
      const thread = await client.getThread(threadId);
      if (!thread) {
        conversation.isExpired = true;
        await conversation.save();
      }
      res.json(conversation);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async createConversation(req: Request, res: Response) {
    // TODO: will retrieve userId in req.user when applying auth middleware
    // const userId = req.user?.id;
    const userId = req.query.userId as string;
    const { assistantId, role = 'user', topic = '' } = req.body;
    const content = beginningPrompt(topic);
    if (!userId) {
      throw new CustomError(404, 'UserNotFound', `No user found with id '${userId}'`);
    }
    if (!assistantId) {
      throw new CustomError(404, 'AssistantNotFound', `No assistant found with id '${assistantId}'`);
    }
    try {
      let run = await client.createThreadAndRun({
        assistantId,
        thread: {
          messages: role && content && [{ role, content }],
        },
      });
      const conversation = await createConversation(run, userId, topic);
      const msgs = await runAndStoreMsgs(run);
      res.json({ conversation, msgs });
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async addMsgToConversation(req: Request, res: Response) {
    const { threadId } = req.params;
    const { role = 'user', action = '' } = req.body;
    const content = continuingPrompt(action);
    try {
      const conversation = await ConversationModel.findOne({ threadId });
      if (!conversation) {
        throw new CustomError(404, 'ConversationNotFound', `No conversation found with threadId '${threadId}'`);
      }
      const message = await client.createMessage(threadId, role, content);
      let run = await client.createRun(threadId, { assistantId: conversation.assistantId });
      conversation.updatedAt = run.createdAt;
      await conversation.save();
      const msgs = await runAndStoreMsgs(run);
      res.json(msgs);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async getAllMessages(req: Request, res: Response) {
    const { threadId } = req.params;
    try {
      const msgs = await MsgModel.find({ threadId });
      res.json(msgs);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },
};
