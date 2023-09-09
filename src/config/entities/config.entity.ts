import {CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Message} from "../../message/entities/message.entity";
import {Hint} from "../../hint/entities/hint.entity";

@Entity()
export class Config {
    constructor(messages: Message[], hints: Hint[]) {
        this.messages = messages;
        this.hints = hints;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Message, message => message.config)
    messages: Message[];

    @OneToMany(type => Hint, hint => hint.config)
    hints: Hint[];

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
}
