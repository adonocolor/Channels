import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "../message/entities/message.entity";
import {Channel} from "../channel/entities/channel.entity";
import {Config} from "./entities/config.entity";
import {Hint} from "../hint/entities/hint.entity";
import {MessageService} from "../message/message.service";
import {HintService} from "../hint/hint.service";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel, Config, Hint])],
  exports: [TypeOrmModule],
  controllers: [ConfigController],
  providers: [ConfigService, MessageService, HintService],
})
export class ConfigModule {}
