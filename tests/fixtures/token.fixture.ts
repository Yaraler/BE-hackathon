import { Role } from "@libs/enum/role.enum";
import { testUser } from "./user.fixture";

export const testToken = {
  id: testUser._id,
  name: testUser.name,
  role: Role.User
}
