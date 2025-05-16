import { ValidateUserDto } from "@libs/contracts/users/validate-user.dto";
import { testUser } from "@tests/fixtures/user.fixture";

export const testValidateUserDto: ValidateUserDto = {
  email: testUser.email,
  password: testUser.password
}
