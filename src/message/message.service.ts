import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "./entities/message.entity";
import {QueryRunner, Repository} from "typeorm";
import {Channel} from "../channel/entities/channel.entity";

@Injectable()
export class MessageService {

  @InjectRepository(Message)
  private readonly messageRepository: Repository<Message>;

  async create(queryRunner: QueryRunner, createMessageDto: CreateMessageDto) {
    const channel = await queryRunner.manager.findOneBy(Channel, {
      id: createMessageDto.channelId
    });

    if (!channel)
      throw new HttpException('Channel not found!', HttpStatus.NOT_FOUND);

    const message = new Message(createMessageDto.text, channel)
    return await queryRunner.manager.save(Message, message);
  }
}
