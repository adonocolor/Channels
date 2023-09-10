import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsInt()
    @IsNotEmpty()
    channelId: number;
}
