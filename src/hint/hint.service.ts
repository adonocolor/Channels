import { Injectable } from '@nestjs/common';
import { CreateHintDto } from './dto/create-hint.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Channel} from "../channel/entities/channel.entity";
import {Repository} from "typeorm";
import {Hint} from "./entities/hint.entity";

@Injectable()
export class HintService {
  @InjectRepository(Channel)
  private readonly channelRepository: Repository<Channel>;
  @InjectRepository(Hint)
  private readonly hintRepository: Repository<Hint>;
  async create(createHintDto: CreateHintDto) {
    const channel = await this.channelRepository.findOneBy({id: createHintDto.channelId})

    if (!channel)
      throw new Error('Channel not found!')

    const hint = new Hint(createHintDto.text, createHintDto.type, channel)
    return await this.hintRepository.save(hint);
  }

  async findAll() {
    return await this.hintRepository.find({})
  }

  async findOne(id: number) {
    return await this.hintRepository.findOneBy({id: id})
  }
}
