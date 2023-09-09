import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateHintDto } from './dto/create-hint.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Channel} from "../channel/entities/channel.entity";
import {QueryRunner, Repository} from "typeorm";
import {Hint} from "./entities/hint.entity";

@Injectable()
export class HintService {
  @InjectRepository(Channel)
  private readonly channelRepository: Repository<Channel>;
  @InjectRepository(Hint)
  private readonly hintRepository: Repository<Hint>;


  async create(queryRunner : QueryRunner, createHintDto: CreateHintDto) {
    const channel = await queryRunner.manager.findOneBy(Channel,{
      id: createHintDto.channelId
    })

    if (!channel)
      throw new HttpException('Channel not found!', HttpStatus.NOT_FOUND)

    const hint = new Hint(createHintDto.text, createHintDto.type, channel)
    return await queryRunner.manager.save(Hint, hint);
  }

  async findAll() {
    return await this.hintRepository.find({})
  }

  async findOne(id: number) {
    return await this.hintRepository.findOneBy({id: id})
  }
}
