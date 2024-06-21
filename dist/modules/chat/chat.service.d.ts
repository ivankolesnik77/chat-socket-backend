import { Model } from 'mongoose';
import { Message } from '../../schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ChatService {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    createMessage(messageDto: CreateMessageDto): Promise<Message>;
    getMessages(): Promise<Message[]>;
}
