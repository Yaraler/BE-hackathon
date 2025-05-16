import { Role } from "@libs/enum/role.enum";
import { User } from "apps/users/src/user/entity/user.entity";



export const testUser: User = {
  _id: "1",
  email: "fara@example.com",
  name: "Fara",
  icon: "default-icon.png",
  password: "hashed-password",
  brigadeId: "1",
  DailyWorkoutsIds: [],
  FirstWorkoutICheckndicatorId: undefined,
  state: false,
  refreshToken: "token",
  role: Role.User
}
