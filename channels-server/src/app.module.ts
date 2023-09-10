import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from './config/config.module';
import { HintModule } from './hint/hint.module';

@Module({
  imports: [DatabaseModule, ChannelModule, MessageModule, ConfigModule, HintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
