import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { RequirementsBrigadeService } from '../requirements_brigade/requirements_bridage.service';
import { Brigade } from './entity/brigade.entity';
import { RequirementsBrigade } from '../requirements_brigade/entity/requirements-brigade.entity';
import { AwsService } from '@aws/aws.service';
import { CreateBrigadeFileDto } from '@libs/contracts/bridage/create-bridage.dto';
import { BrigadeGetAllResponse } from './dto/brigade-all-response.dto';
import { CreateBrigadeResponseDto } from './dto/create-brigade-response.dto';

@Injectable()
export class BrigadeService {
  constructor(
    @Inject(forwardRef(() => RequirementsBrigadeService))
    private readonly requirementsBrigadeService: RequirementsBrigadeService,
    @Inject('BRIGADE_REPOSITORY')
    private readonly brigadeRepository: MongoRepository<Brigade>,
    private awsService: AwsService
  ) { }
  async createBrigade(data: CreateBrigadeFileDto): Promise<CreateBrigadeResponseDto> {
    try {
      const { requirementsBrigade, shortName, file, name, description } = data
      const transformedRequirements = await this.requirementsBrigadeService.transformRequirementsBrigade(requirementsBrigade)
      let imgURL: string | undefined
      if (file) {
        imgURL = await this.awsService.createPhoto(file)
      }

      const brigade = new Brigade()
      brigade.shortName = shortName
      brigade.name = name
      brigade.description = description
      brigade.image = imgURL
      brigade.requirementsBrigade = transformedRequirements

      const saveBrigade = await this.brigadeRepository.save(brigade) as Brigade;
      return { brigade: saveBrigade };
    } catch (error) {
      console.error(error)
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
  async getAllBrigade(): Promise<BrigadeGetAllResponse> {
    try {
      const brigades = await this.brigadeRepository.find();

      return { brigades: brigades };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }
  async getOneBrigade(brigadeId: string): Promise<any> {
    try {
      if (!ObjectId.isValid(brigadeId)) {
        throw new BadRequestException('Invalid brigade ID');
      }
      const brigadeRepository = this.brigadeRepository;
      const brigade = await brigadeRepository.findOneBy({
        _id: new ObjectId(brigadeId)
      });
      if (!brigade) {
        throw new NotFoundException(`Brigade  not found`);
      }
      return {
        brigade,
      };
    } catch (error) {
      throw error;
    }
  }
  async findBrigadeById(id: string) {
    try {
      const brigade = await this.brigadeRepository.findOneBy({ _id: new ObjectId(id) });
      return brigade;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw 'An unexpected error occurred';
    }

  }
}
