import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from '@libs/contracts/users/registration.dto';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { MyLoggerService } from '@app/my-logger';
import { ObjectId } from 'mongodb';
import { TokenService } from '../token/token.service';
import { RefreshAccessTokenDto } from '@libs/contracts/users/refresh-access-token.dto';
import { TokenDto } from '@libs/contracts/token/token.dto';
import { ValidateUserDto } from '@libs/contracts/users/validate-user.dto';
import { TokenResposneDto } from './dto/token-response.dto';
import { AccessTokenResponseDto } from './dto/access-token-response.dto';
import { HashService } from '@shared/lib/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private userService: UserService,
    private tokenService: TokenService,
    private readonly logger: MyLoggerService,
    private readonly hashService: HashService,
  ) { }
  async validateUser(data: ValidateUserDto): Promise<User | null> {
    try {
      const user = await this.userService.findOne(data.email);
      if (!user) return null;

      const verifyPassword = await this.hashService.compareHash(data.password, user.password);
      if (!verifyPassword) return null;

      return user;

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Validate user failed');
    }
  }

  async registration(data: RegistrationDto): Promise<TokenResposneDto> {
    try {
      const { name, email, password, brigadId } = data
      if (await this.userService.findOne(email)) {
        throw new BadRequestException('The email was already taken.');
      }
      const hashedPassword = await this.hashService.hashPassword(password);
      const newUser = this.userRepository.create({
        name: name,
        email: email,
        password: hashedPassword,
        brigadeId: brigadId,
        DailyWorkoutsIds: []
      })
      const user = await this.userRepository.save(newUser);
      return this.createToken(user)
    } catch (error) {
      this.logger.error(error)
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async login(data: User): Promise<TokenResposneDto> {
    try {
      return await this.createToken(data)
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Login failed');
    }
  }

  async refresh(data: RefreshAccessTokenDto): Promise<AccessTokenResponseDto> {
    try {
      const { refreshToken } = data;

      const payload = await this.tokenService.verifyRefreshToken(refreshToken);
      const user = await this.userService.findById(payload.id);

      if (!user) throw new BadRequestException('The user id dosent find.');

      const isMatch = await this.hashService.compareHash(refreshToken, user.refreshToken);
      if (!isMatch) throw new UnauthorizedException('Invalid refresh token');

      const newAccessToken = await this.tokenService.createAccessToken(payload)

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async createToken(user: User): Promise<TokenResposneDto> {
    try {
      const payload: TokenDto = { name: user.name, id: user._id.toString() };
      const accessToken = await this.tokenService.createAccessToken(payload)
      const refreshToken = await this.tokenService.createRefreshToken(payload)
      await this.saveRefreshToken(user._id.toString(), refreshToken);
      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      if (!(err instanceof HttpException)) {
        throw new InternalServerErrorException('Token create error')
      }
      throw err;
    }
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const hashed = await this.hashService.hashPassword(refreshToken);
    await this.userRepository.update(userId, { refreshToken: hashed });
  }
}
