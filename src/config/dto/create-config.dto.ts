import {CreateMessageDto} from "../../message/dto/create-message.dto";
import {CreateHintDto} from "../../hint/dto/create-hint.dto";

export class CreateConfigDto {
    messages: CreateMessageDto[];
    hints: CreateHintDto[];
}
