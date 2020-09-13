import { IsString } from "class-validator";

export class CreateBicycleDto {
    @IsString({message: "is required"})
    name: string;
    @IsString()
    model: string;
    @IsString()
    type: string;
    @IsString()
    color: string;
    @IsString()
    description: string;
    @IsString()
    img: string;
}