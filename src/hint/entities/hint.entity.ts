import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Channel} from "../../channel/entities/channel.entity";
import {Config} from "../../config/entities/config.entity";
import {HintTypeEnum} from "./hintType.enum";

@Entity()
export class Hint {

    constructor(text: string, type: HintTypeEnum, channel: Channel) {
        this.text = text;
        this.channel = channel;
        this.type = type;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    text: string;

    @Column({
        type: 'enum',
        enum: HintTypeEnum
    })
    type: HintTypeEnum;

    @ManyToOne(type => Channel)
    channel: Channel;

    @ManyToOne(type => Config, config => config.hints)
    config: Config;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
}
