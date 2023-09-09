import {HintTypeEnum} from "../entities/hintType.enum";
import {IsEnum, IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreateHintDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsEnum(HintTypeEnum)
    @IsNotEmpty()
    type: HintTypeEnum;

    @IsInt()
    @IsNotEmpty()
    channelId: number;
}
