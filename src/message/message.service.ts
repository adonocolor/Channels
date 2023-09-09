import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "./entities/message.entity";
import {Repository} from "typeorm";
import {Channel} from "../channel/entities/channel.entity";

@Injectable()
export class MessageService {

  @InjectRepository(Message)
  private readonly messageRepository: Repository<Message>;
  @InjectRepository(Channel)
  private readonly channelRepository: Repository<Channel>;
  async create(createMessageDto: CreateMessageDto) {
    const channel = await this.channelRepository.findOneBy({id: createMessageDto.channelId});

    if (!channel)
      throw new Error('Channel not found!');

    const message = new Message(createMessageDto.text, channel)
    return await this.messageRepository.save(message);
  }

  async findAll() {
    return await this.messageRepository.find({});
  }

  async findOne(id: number) {
    return await this.messageRepository.findOneBy({id: id});
  }
}
