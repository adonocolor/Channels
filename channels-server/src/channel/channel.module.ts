import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "../message/entities/message.entity";
import {Channel} from "./entities/channel.entity";
import {Config} from "../config/entities/config.entity";
import {Hint} from "../hint/entities/hint.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel, Config, Hint])],
  exports: [TypeOrmModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
