import { IsNotEmpty, IsString } from "class-validator"

export class CreateExerciseTemplateDto {
  @IsString()
  name: string
  @IsString()
  imgUrl: string
  @IsNotEmpty()
  @IsString()
  videoUrl?: string
  @IsString()
  engName: string
  @IsString()
  type: string
}
