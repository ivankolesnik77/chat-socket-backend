import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),

    MongooseModule.forRoot(
      'mongodb+srv://stonebo0sh77:6auBxzMmGZt7tfCs@cluster0.6bixfen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),

    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
