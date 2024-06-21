import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ collection: 'messages' })
export class Message extends Document {
  @Prop()
  userId: string;

  @Prop()
  text: string;

  @Prop({ required: false })
  filename: string;

  @Prop({ required: false })
  fileUrl: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}
export type CatDocument = HydratedDocument<Message>;

export const MessageSchema = SchemaFactory.createForClass(Message);
