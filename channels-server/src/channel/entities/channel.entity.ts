import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    textLength: number;

    @Column({nullable: true})
    standardButtonCount: number;

    @Column({nullable: true})
    standardButtonTextLength: number;

    @Column({nullable: true})
    standardButtonLinkCount: number;

    @Column({nullable: true})
    inlineButtonCount: number;

    @Column({nullable: true})
    inlineButtonTextLength: number;

    @Column({nullable: true})
    inlineButtonLinkCount: number;
}
