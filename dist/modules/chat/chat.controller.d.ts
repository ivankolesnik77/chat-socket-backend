import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    uploadFile(file: any): {
        fileUrl: string;
    };
    messages(): Promise<import("../../schemas/message.schema").Message[]>;
}
