import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./entities/message.entity";
import {Channel} from "../channel/entities/channel.entity";
import {Config} from "../config/entities/config.entity";
import {Hint} from "../hint/entities/hint.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel, Config, Hint])],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [MessageService],
})
export class MessageModule {}
