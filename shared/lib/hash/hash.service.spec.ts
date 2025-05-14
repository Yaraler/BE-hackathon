import { Test, TestingModule } from "@nestjs/testing";
import { HashService } from "./hash.service";


describe('Hash service', () => {
  let service: HashService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
      ]
    }).compile();
    service = module.get<HashService>(HashService)
  })
  it('should hash password correctly', async () => {
    const password = 'mySecret123';
    const hash = await service.hashPassword(password);

    expect(typeof hash).toBe('string');
    expect(hash).not.toEqual(password);
    expect(hash.length).toBeGreaterThan(0);
  });

  it('should compare hashed and plain text correctly (match)', async () => {
    const password = 'password123';
    const hash = await service.hashPassword(password);

    const isMatch = await service.compareHash(password, hash);
    expect(isMatch).toBe(true);
  });

  it('should compare hashed and plain text correctly (no match)', async () => {
    const password = 'password123';
    const wrongPassword = 'wrongPassword';
    const hash = await service.hashPassword(password);

    const isMatch = await service.compareHash(wrongPassword, hash);
    expect(isMatch).toBe(false);
  });
})

