import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import {Connection, Repository} from "typeorm";
import {Config} from "./entities/config.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageService} from "../message/message.service";
import {HintService} from "../hint/hint.service";

@Injectable()
export class ConfigService {
  constructor(private readonly hintService: HintService,
              private readonly messageService: MessageService,
              private readonly connection: Connection,
              ) {}

  @InjectRepository(Config)
  private readonly configRepository: Repository<Config>;

  async create(createConfigDto: CreateConfigDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {
      let messages = [];
      for (let i = 0; i < createConfigDto.messages.length; i++) {
        const created = await this.messageService.create(queryRunner, createConfigDto.messages[i]);
        messages.push(created);
      }

      let hints = [];

      for (let i = 0; i < createConfigDto.hints.length; i++) {
        const created = await this.hintService.create(queryRunner, createConfigDto.hints[i]);
        hints.push(created);
      }

      const config = new Config(messages, hints);
      const res = await queryRunner.manager.save(Config, config);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return res;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const error: any = {
        status: false,
        error: err.message,
      };
      await queryRunner.release();
      return error;
    }
  }

  findAll() {
    return this.configRepository.find({});
  }

  findOne(id: number) {
    return this.configRepository.findOneBy({id : id});
  }
}
