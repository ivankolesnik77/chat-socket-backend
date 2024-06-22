export interface IMessage {
    id: string;
    userId: string | null;
    username: string;
    fileUrl?: string;
}
export interface ITextMessage extends IMessage {
    text: string;
}
export interface IFileMessage extends IMessage {
    source: string;
}
export interface IUser {
    userId: string;
    username: string;
    token: string;
    chatId: string;
}
