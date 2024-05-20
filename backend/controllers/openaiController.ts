import { Request, Response } from 'express';
import { Assistant, AssistantsClient, ThreadMessage, ThreadRun } from '@azure/openai-assistants';
import { handleErrorResponse } from '../utils/errorUtils';
import { client } from '../utils/openaiUtils';

const OPENAI_MODEL = process.env.OPENAI_MODEL as string;

const assistantName = 'StoryTelling Tutor for Children';
const assistantInstructions = (targetAge: number) =>
  `You are a storytelling and speech tutor for children aged ${targetAge}. Make sure your stories and words can be understood and pronounced by children aged ${targetAge}`;

// Operations
export async function createStoryAssistant(client: AssistantsClient, targetAge: number): Promise<Assistant> {
  return await client.createAssistant({
    model: OPENAI_MODEL,
    name: assistantName,
    instructions: assistantInstructions(targetAge),
  });
}

async function runAndGetMessages(run: ThreadRun): Promise<ThreadMessage[]>  {
  while (run.status === 'queued' || run.status === 'in_progress') {
    run = await client.getRun(run.threadId, run.id);
  }
  const { data } = await client.listMessages(run.threadId);
  return data;
}

// Controllers (for dev only)
export const assistantController = {
  async getAllAssistants(req: Request, res: Response) {
    try {
      const assistants = await client.listAssistants();
      res.json(assistants.data);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async getAssistantById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const assistant = await client.getAssistant(id);
      res.json(assistant);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async createAssistant(req: Request, res: Response) {
    const { name = '', instructions = '' } = req.body;
    try {
      const assistant = await client.createAssistant({
        model: OPENAI_MODEL,
        name,
        instructions,
      });
      res.json(assistant);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async deleteAssistant(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const assistantToBeDeleted = await client.deleteAssistant(id);
      res.json(assistantToBeDeleted);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },
};

export const threadController = {
  async getThreadById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const thread = await client.getThread(id);
      res.json(thread);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async createThread(req: Request, res: Response) {
    try {
      const thread = await client.createThread();
      res.json(thread);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async deleteThread(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await client.deleteThread(id);
      res.json(result);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },
};

export const runController = {
  async getAllThreadRuns(req: Request, res: Response) {
    const { threadId } = req.params;
    try {
      const runs = await client.listRuns(threadId);
      res.json(runs.data);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async createThreadRun(req: Request, res: Response) {
    const { threadId } = req.params;
    const { assistantId } = req.body;
    try {
      const run = await client.createRun(threadId, { assistantId });
      res.json(run);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async createThreadAndRun(req: Request, res: Response) {
    const { assistantId, role = '', content = '' } = req.body;
    try {
      const run = await client.createThreadAndRun({
        assistantId,
        thread: {
          messages: role && content && [{ role, content }],
        },
      });
      const messages = await runAndGetMessages(run);
      res.json({ run, messages });
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async getThreadRun(req: Request, res: Response) {
    const { threadId, runId } = req.params;
    try {
      const run = await client.getRun(threadId, runId);
      res.json(run);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async cancelThreadRun(req: Request, res: Response) {
    const { threadId, runId } = req.params;
    try {
      const run = await client.cancelRun(threadId, runId);
      res.json(run);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },
};

export const messageController = {
  async getAllMessagesInThread(req: Request, res: Response) {
    const { threadId } = req.params;
    try {
      const messages = await client.listMessages(threadId);
      res.json(messages.data);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async addMessageAndRunThread(req: Request, res: Response) {
    const { threadId } = req.params;
    const { assistantId, role, content } = req.body;
    try {
      await client.createMessage(threadId, role, content);
      const run = await client.createRun(threadId, { assistantId });
      const messages = await runAndGetMessages(run);
      res.json(messages);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },

  async getMessageInThread(req: Request, res: Response) {
    const { threadId, messageId } = req.params;
    try {
      const message = await client.getMessage(threadId, messageId);
      res.json(message);
    } catch (err: any) {
      handleErrorResponse(res, err);
    }
  },
}
