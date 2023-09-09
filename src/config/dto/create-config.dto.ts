import {CreateMessageDto} from "../../message/dto/create-message.dto";
import {CreateHintDto} from "../../hint/dto/create-hint.dto";
import {IsArray, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class CreateConfigDto {
    @ValidateNested({each: true})
    @IsArray()
    @Type(() => CreateMessageDto)
    messages: CreateMessageDto[];
    @ValidateNested({each: true})
    @IsArray()
    @Type(() => CreateHintDto)
    hints: CreateHintDto[];
}
