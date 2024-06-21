import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return { fileUrl: `/uploads/${file.filename}` };
  }

  @Get('messages')
  async messages() {
    try {
      const messages = await this.chatService.getMessages();
      console.log(messages);
      return messages;
    } catch (err) {
      console.error('Error fetching messages:', err);
      throw new InternalServerErrorException('Failed to fetch messages');
    }
  }
}
