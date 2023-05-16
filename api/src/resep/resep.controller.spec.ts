import { Test, TestingModule } from '@nestjs/testing';
import { ResepController } from './resep.controller';
import { ResepService } from './services/resep.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResepEntity } from './entities/resep.entity';
import { mockResepEntity } from './entities/__fixtures__/resep-entity.fixture';

describe('ResepController', () => {
  let controller: ResepController;
  let resepService: ResepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResepController],
      providers: [
        ResepService,
        ConfigService,
        {
          provide: getRepositoryToken(ResepEntity),
          useValue: {},
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<ResepController>(ResepController);
    resepService = module.get<ResepService>(ResepService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create resep method', () => {
    it('should register resep', async () => {
      jest.spyOn(resepService, 'createResep').mockResolvedValue({
        resep_id: 1,
        nama_pasien: 'f_name',
        nama_klinik: 'klinik-1',
        nama_dokter: 'dokter-1',
        total_harga: 5000,
        status: 'created',
      });

      expect(
        await controller.create({
          nama_pasien: 'f_name',
          nama_klinik: 'klinik-1',
          nama_dokter: 'dokter-1',
          total_harga: 5000,
          status: 'created',
        }),
      ).toStrictEqual({
        message: 'Resep created',
        resep: {
          id: 0,
          token: 'token',
        },
      });
    });
  });

  describe('get reseps method', () => {
    it('should retrieve all resep', async () => {
      const resepServiceSpy = jest
        .spyOn(resepService, 'getAll')
        .mockResolvedValue([mockResepEntity]);

      expect(await controller.getReseps()).toStrictEqual({
        message: 'Resep retrieved successfully',
        reseps: [mockResepEntity],
      });
      expect(resepServiceSpy).toHaveBeenCalledTimes(1);
    });
  });
});
