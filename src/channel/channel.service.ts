import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Channel} from "./entities/channel.entity";

@Injectable()
export class ChannelService {
  @InjectRepository(Channel)
  private readonly channelRepository: Repository<Channel>;

  async findAll() {
    return await this.channelRepository.find({});
  }

  async findOne(id: number) {
    return await this.channelRepository.findOneBy({
      id: id,
    });
  }
}
