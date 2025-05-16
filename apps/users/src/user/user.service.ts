import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { MyLoggerService } from '@app/my-logger';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly logger: MyLoggerService,
  ) { }


  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Get user failed.');
    }
  }
  async findById(id: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: { _id: id },
      });
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Get user failed.');
    }
  }
}
