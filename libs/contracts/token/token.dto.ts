import { Role } from "@libs/enum/role.enum"



export interface TokenDto {
  name: string,
  id: string
  role: Role
}
