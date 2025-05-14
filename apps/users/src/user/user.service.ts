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


  async findOne(email: string): Promise<any | undefined> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        relations: ['bridage', 'dailyWorkout'],
      });
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Get user failed.');
    }
  }
  async findById(id: string): Promise<any | undefined> {
    try {
      return await this.userRepository.findOne({
        where: { _id: id },
        relations: ['bridage', 'dailyWorkout'],
      });
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Get user failed.');
    }
  }
}
