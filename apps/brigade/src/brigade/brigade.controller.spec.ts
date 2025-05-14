import { Test, TestingModule } from "@nestjs/testing";
import { BrigadeController } from "./brigade.controller";
import { BrigadeService } from "./brigade.service";
import { CreateBrigadeFileDto } from "@libs/contracts/bridage/create-bridage.dto";
import { testCreateBrigadeDto } from "../../../../tests/fixtures/brigade.fixture";


describe('BrigadeController', () => {
  let controller: BrigadeController;
  let service: BrigadeService;

  const mockBrigadeService = {
    createBrigade: jest.fn(),
    getAllBrigade: jest.fn(),
    getOneBrigade: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrigadeController],
      providers: [
        {
          provide: BrigadeService,
          useValue: mockBrigadeService,
        },
      ],
    }).compile();

    controller = module.get<BrigadeController>(BrigadeController);
    service = module.get<BrigadeService>(BrigadeService);
  })

  it('should call createBrigade with correct data', async () => {
    const dto: CreateBrigadeFileDto = testCreateBrigadeDto
    mockBrigadeService.createBrigade.mockResolvedValue('created');

    const result = await controller.createBrigade(dto);
    expect(service.createBrigade).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should return one brigade', async () => {
    mockBrigadeService.getOneBrigade.mockResolvedValue('brigade1');

    const result = await controller.getOneBrigade();
    expect(service.getOneBrigade).toHaveBeenCalledWith('');
    expect(result).toBe('brigade1');
  });

})
