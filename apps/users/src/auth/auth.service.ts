import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ValidateUserDto } from '@libs/contracts/users/validateUser.dto';
import { RegistrationDto } from '@libs/contracts/users/registration.dto';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@libs/constants';
import { LoginDto } from '@libs/contracts/users/login.dto';
import { MyLoggerService } from '@app/my-logger';
import { IUser } from '@libs/contracts/type/user';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly logger: MyLoggerService,
  ) { }
  async validateUser(data: ValidateUserDto): Promise<any> {
    try {
      const user = await this.userService.findOne(data.email);
      if (user) {
        const verifyPassword = await bcrypt.compareSync(data.password, user.password);

        if (!verifyPassword) {
          return null
        }
        return user
      }
      return null;
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Validate user failed');
    }
  }

  async registration(data: RegistrationDto): Promise<any> {
    try {
      const { name, email, password } = data
      if (await this.userService.findOne(email)) {
        throw new BadRequestException('The email was already taken.');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        name: name,
        email: email,
        password: hashedPassword,
        bridage: undefined,
        dailyWorkout: [],
      })
      const user = await this.userRepository.save(newUser);
      return this.create_token(user)
    } catch (error) {
      this.logger.error(error)
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async login(data: User) {
    try {
      return await this.create_token(data)
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Login failed');
    }

  }

  async refresh(data) {
    try {
      const { refreshToken } = data;

      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refresh_secret
      });

      const user = await this.userService.findById(payload.sub);

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) throw new UnauthorizedException('Invalid refresh token');

      const newAccessToken = this.jwtService.sign(
        { username: user.username, sub: user._id },
        { secret: jwtConstants.secret, expiresIn: "24h" },
      );
      return { accessToken: newAccessToken };
    } catch (err) {
      this.logger.error(err)
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async create_token(user: User) {
    try {
      const payload = { name: user.name, sub: user._id };

      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h',
      });
      const refreshToken = this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '24d',
      });
      await this.saveRefreshToken(user._id.toString(), refreshToken);
      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      this.logger.error(err)
      throw new InternalServerErrorException('Token create error')
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, { refreshToken: hashed });
  }
}
