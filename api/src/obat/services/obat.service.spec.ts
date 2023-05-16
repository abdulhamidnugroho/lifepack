import { Test, TestingModule } from '@nestjs/testing';
import { ObatService } from './obat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObatEntity } from '../entities/obat.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { mockObatEntity } from '../entities/__fixtures__/obat-entity.fixture';

describe('ObatService', () => {
  let service: ObatService;
  let repo: Repository<ObatEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObatService,
        ConfigService,
        {
          provide: getRepositoryToken(ObatEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ObatService>(ObatService);
    repo = module.get<Repository<ObatEntity>>(getRepositoryToken(ObatEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to check obat existence', async () => {
    const findOneSpy = jest.spyOn(repo, 'findOne').mockResolvedValue(null);

    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        email: 'mail',
      },
    });
  });

  it('should be able to create obat', async () => {
    const createSpy = jest
      .spyOn(repo, 'create')
      .mockReturnValue(mockObatEntity);
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(mockObatEntity);

    const newObat = await service.createObat({
      name: 'Obat Name',
      sku: 'sku',
      price: 1000,
      konfigurasi_harga_id: 1,
      termasuk_pajak: true,
      stock: 10,
    });

    expect(newObat).toStrictEqual(mockObatEntity);

    expect(saveSpy).toHaveBeenCalledTimes(2);
    expect(createSpy).toHaveBeenCalledWith({
      name: 'Obat Name',
      sku: 'sku',
      price: 1000,
      konfigurasi_harga_id: 1,
      termasuk_pajak: true,
      stock: 10,
    });
  });

  it('should get all obats', async () => {
    const repoSpy = jest
      .spyOn(repo, 'find')
      .mockResolvedValue([mockObatEntity]);

    expect(await service.getAll()).toStrictEqual([mockObatEntity]);
    expect(repoSpy).toHaveBeenCalledWith({
      select: ['product_id', 'name', 'sku', 'price', 'konfigurasi_harga_id', 'termasuk_pajak', 'stock'],
    });
  });
});
