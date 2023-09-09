import {HintTypeEnum} from "../entities/hintType.enum";

export class CreateHintDto {
    text: string;
    type: HintTypeEnum;
    channelId: number;
}
