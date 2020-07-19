import { IsString } from "class-validator";

export class CreateNoteDto {
    @IsString({message: "is required"})
    description: string;
}