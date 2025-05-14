import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BrigadeService } from './brigade.service';
import { CreateBrigadeFileDto } from '@libs/contracts/bridage/create-bridage.dto';

@Controller('bridage')
export class BrigadeController {
  constructor(
    private readonly brigadeService: BrigadeService
  ) { }
  @MessagePattern("brigade.createBrigade")
  async createBrigade(data: CreateBrigadeFileDto) {
    return await this.brigadeService.createBrigade(data)
  }
  @MessagePattern("brigade.getBrigade")
  async getBrigade() {
    return await this.brigadeService.getAllBrigade()
  }
  @MessagePattern("brigade.getOneBrigade")
  async getOneBrigade() {
    return await this.brigadeService.getOneBrigade("")
  }

}
