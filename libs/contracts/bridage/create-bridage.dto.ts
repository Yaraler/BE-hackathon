import { IsArray, IsObject, IsString, ValidateNested } from "class-validator"
import { Transform, Type } from "class-transformer"
import * as Multer from 'multer';
import { CreateRequirementsBrigade } from "./create-requirement-bridage";


export class CreateBrigadeDto {
  @IsString()
  name: string
  @IsString()
  shortName: string
  @IsString()
  description: string
  @IsArray()
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(item => {
        try {
          return typeof item === 'string' ? JSON.parse(item) : item;
        } catch (e) {
        }
      });
    }
    return [];
  })
  @Type(() => CreateRequirementsBrigade)
  requirementsBrigade: CreateRequirementsBrigade[];
}

export class CreateBrigadeFileDto extends CreateBrigadeDto {
  file: Multer.File | undefined


}
