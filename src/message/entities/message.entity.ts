import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Config} from "../../config/entities/config.entity";
import {Channel} from "../../channel/entities/channel.entity";

@Entity()
export class Message {
    constructor(text: string, channel: Channel) {
        this.text = text;
        this.channel = channel;

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    text: string;

    @ManyToOne(type => Channel)
    channel: Channel;

    @ManyToOne(type => Config, config => config.messages)
    config: Config;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
}
