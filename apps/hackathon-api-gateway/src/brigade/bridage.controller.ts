import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BrigadeService } from './bridage.service';
import * as Multer from 'multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateBrigadeDto } from '@libs/contracts/bridage/create-bridage.dto';

@Controller('brigade')
export class BrigadeController {
  constructor(private readonly brigadeService: BrigadeService) { }
  @Post("create-brigade")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'brigadeImg', maxCount: 1 }], {
      storage: Multer.memoryStorage(),
    }),
  )
  async createBrigade(@UploadedFiles() file: { brigadeImg?: Multer.File }, @Body() data: CreateBrigadeDto) {
    console.log(file.brigadeImg[0].buffer)
    const img = file?.brigadeImg[0] ? file?.brigadeImg[0] : undefined
    return await this.brigadeService.createBrigade(data, img)
  }
  @Get()
  async getBrigade() {
    return await this.brigadeService.getBrigades()
  }
  @Get(':id')
  async getOneBrigade(@Param('id') id: string) {
    return await this.brigadeService.getBrigade(id);
  }

}
