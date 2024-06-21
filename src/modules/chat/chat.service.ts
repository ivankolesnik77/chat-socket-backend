import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { getId } from 'src/utils/helpers';
import { writeFile, writeFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async createMessage(messageDto: CreateMessageDto): Promise<Message> {
    const { file, ...messagePayload } = messageDto;
    const message = { ...messagePayload, filename: null };
    if (!messageDto.userId) {
      messageDto.userId = getId();
    }

    if (messageDto.file) {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        messageDto.file.filename,
      );
      writeFileSync(filePath, Buffer.from(messageDto.file.buffer));

      message.filename = messageDto.file.filename;
      message.fileUrl = `http://localhost:3001/uploads/${messageDto.file.filename}`;
    }

    const msg = new this.messageModel(message);
    const createdMessage = await msg.save();

    return createdMessage;
  }

  async getMessages(): Promise<Message[]> {
    return await this.messageModel.find().exec();
  }
}
