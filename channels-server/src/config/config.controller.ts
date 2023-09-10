import {Controller, Get, Post, Body, Param, ValidationPipe, UsePipes} from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService,
              ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.create(createConfigDto);
  }

  @Get()
  findAll() {
    return this.configService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configService.findOne(+id);
  }
}
