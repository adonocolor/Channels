import { Module } from '@nestjs/common';
import { HintService } from './hint.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "../message/entities/message.entity";
import {Channel} from "../channel/entities/channel.entity";
import {Config} from "../config/entities/config.entity";
import {Hint} from "./entities/hint.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel, Config, Hint])],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [HintService],
})
export class HintModule {}
