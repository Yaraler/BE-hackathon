import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRequirementsBrigade {
  @IsString()
  exercise: string;
  @IsNumber()
  minimum?: number;
  @IsOptional()
  @IsNumber()
  maximum?: number;
}
