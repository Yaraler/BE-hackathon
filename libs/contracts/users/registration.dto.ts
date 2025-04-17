import { IsEmail, IsString } from "class-validator"


export class RegistrationDto {
  @IsString()
  password: string
  @IsEmail()
  email: string
  @IsString()
  name: string
}
