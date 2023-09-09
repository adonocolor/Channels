import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "../message/entities/message.entity";
import {Channel} from "../channel/entities/channel.entity";
import {Config} from "../config/entities/config.entity";
import {Hint} from "../hint/entities/hint.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'ado',
            database: 'channels',
            entities: [Message, Channel, Config, Hint],
            synchronize: true,
            autoLoadEntities: true,
        }),
    ],
})
export class DatabaseModule {}
