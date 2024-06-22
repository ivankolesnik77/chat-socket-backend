export declare class CreateMessageDto {
    userId: string;
    message: string;
    file?: IFile;
    fileUrl?: string;
}
export interface IFile {
    buffer: Uint8Array;
    filename: string;
}
