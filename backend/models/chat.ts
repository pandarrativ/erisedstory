import mongoose, { Schema, Document } from 'mongoose';

export enum SENDER_ROLE {
  USER = 'user',
  SYSTEM = 'system',
  ASSISTANT = 'assistant',
}

export interface IBot extends Document {
  assistantId: string;
  name?: string;
  instructions?: string;
  targetAge: number;
  createdAt: Date;
}

export interface IConversation extends Document {
  threadId: string;
  userId: string;
  assistantId: string;
  topic: string;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMsg extends Document {
  messageId: string;
  threadId: string;
  role: SENDER_ROLE;
  text: string;
  createdAt: Date;
}

const BotSchema = new Schema<IBot>({
  assistantId: { type: String, required: true, unique: true },
  name: { type: String },
  instructions: { type: String },
  targetAge: { type: Number },
  createdAt: { type: Date },
});

const ConversationSchema = new Schema<IConversation>({
  threadId: { type: String, required: true, unique: true },
  userId: { type: String, ref: 'User' },
  assistantId: { type: String, ref: 'Bot' },
  topic: { type: String },
  isExpired: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MsgSchema = new Schema<IMsg>({
  messageId: { type: String, required: true, unique: true },
  threadId: { type: String, required: true, ref: 'Conversation'},
  role: { type: String, enum: SENDER_ROLE },
  text: { type: String },
  createdAt: { type: Date },
});

export const BotModel = mongoose.model<IBot>('Bot', BotSchema);
export const ConversationModel = mongoose.model<IConversation>('Conversation', ConversationSchema);
export const MsgModel = mongoose.model<IMsg>('Msg', MsgSchema);
