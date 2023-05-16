import { Test, TestingModule } from '@nestjs/testing';
import { ObatController } from './obat.controller';
import { ObatService } from './services/obat.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObatEntity } from './entities/obat.entity';
import { mockObatEntity } from './entities/__fixtures__/obat-entity.fixture';

describe('ObatController', () => {
  let controller: ObatController;
  let obatService: ObatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObatController],
      providers: [
        ObatService,
        ConfigService,
        {
          provide: getRepositoryToken(ObatEntity),
          useValue: {},
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<ObatController>(ObatController);
    obatService = module.get<ObatService>(ObatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create obat method', () => {
    it('should register obat', async () => {
      jest.spyOn(obatService, 'createObat').mockResolvedValue({
        product_id: 1,
        name: 'f_name',
        sku: 'sku-1',
        price: 10000,
        konfigurasi_harga_id: 1,
        termasuk_pajak: true,
        stock: 10
      });

      expect(
        await controller.create({
          name: 'f_name',
          sku: 'sku-1',
          price: 10000,
          konfigurasi_harga_id: 1,
          termasuk_pajak: true,
          stock: 10
        }),
      ).toStrictEqual({
        message: 'Obat created',
        obat: {
          id: 0,
          token: 'token',
        },
      });
    });
  });

  describe('get obats method', () => {
    it('should retrieve all obat', async () => {
      const obatServiceSpy = jest
        .spyOn(obatService, 'getAll')
        .mockResolvedValue([mockObatEntity]);

      expect(await controller.getObats()).toStrictEqual({
        message: 'Obat retrieved successfully',
        obats: [mockObatEntity],
      });
      expect(obatServiceSpy).toHaveBeenCalledTimes(1);
    });
  });
});
