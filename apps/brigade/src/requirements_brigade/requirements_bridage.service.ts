import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { RequirementsBrigade } from './entity/requirements-brigade.entity';
import { CreateRequirementsBrigade } from '@libs/contracts/bridage/create-requirement-bridage';

@Injectable()
export class RequirementsBrigadeService {
  constructor(
    @Inject('REQUIREMENT_BRIGADE_REPOSITORY')
    private requirementsBrigadeRestory: Repository<RequirementsBrigade>,
  ) { }
  async transformRequirementsBrigade(requirementsBrigade: CreateRequirementsBrigade[]
  ): Promise<RequirementsBrigade[]> {
    try {
      const traansformedRequirements = requirementsBrigade.map((elem, index) => (
        new RequirementsBrigade(elem.exercise, elem?.minimum, elem?.maximum)
      ))

      return traansformedRequirements;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw 'An unexpected error occurred';
    }
  }
}
