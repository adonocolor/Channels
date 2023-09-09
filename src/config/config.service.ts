import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import {Repository} from "typeorm";
import {Config} from "./entities/config.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageService} from "../message/message.service";
import {HintService} from "../hint/hint.service";

@Injectable()
export class ConfigService {
  constructor(private readonly hintService: HintService, private readonly messageService: MessageService) {}

  @InjectRepository(Config)
  private readonly configRepository: Repository<Config>;

  async create(createConfigDto: CreateConfigDto) {
    let messages = [];
    for (let i = 0; i < createConfigDto.messages.length; i++) {
      const created = await this.messageService.create(createConfigDto.messages[i]);
      messages.push(created);
    }

    let hints = [];

    for (let i = 0; i < createConfigDto.hints.length; i++) {
      const created = await this.hintService.create(createConfigDto.hints[i]);
      hints.push(created);
    }

    const config = new Config(messages, hints);
    return await this.configRepository.save(config);
  }

  findAll() {
    return this.configRepository.find({});
  }

  findOne(id: number) {
    return this.configRepository.findOneBy({id : id});
  }

  // update(id: number, updateConfigDto: UpdateConfigDto) {
  //   return `This action updates a #${id} config`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} config`;
  // }
}
