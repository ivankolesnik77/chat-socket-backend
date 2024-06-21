import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  message: string;

  @IsOptional()
  file?: IFile;

  @IsOptional()
  @IsUrl()
  fileUrl?: string;
}

export interface IFile {
  buffer: Uint8Array;
  filename: string;
}
