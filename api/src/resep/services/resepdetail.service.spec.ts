import { Test, TestingModule } from '@nestjs/testing';
import { ResepDetailService } from './resepdetail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResepDetailEntity } from '../entities/resepdetail.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { mockResepDetailEntity } from '../entities/__fixtures__/resepdetail.fixture';

describe('ResepDetailService', () => {
  let service: ResepDetailService;
  let repo: Repository<ResepDetailEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResepDetailService,
        ConfigService,
        {
          provide: getRepositoryToken(ResepDetailEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResepDetailService>(ResepDetailService);
    repo = module.get<Repository<ResepDetailEntity>>(getRepositoryToken(ResepDetailEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to check resep detail existence', async () => {
    const findOneSpy = jest.spyOn(repo, 'findOne').mockResolvedValue(null);

    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        email: 'mail',
      },
    });
  });

  it('should be able to create resep detail', async () => {
    const createSpy = jest
      .spyOn(repo, 'create')
      .mockReturnValue(mockResepDetailEntity);
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(mockResepDetailEntity);

    const newResep = await service.createResepDetail({
      resep_id: 1,
      product_id: 1,
      product_name: 'p name',
      qty: 2,
      original_price: 3000,
      konfigurasi_harga: 1,
      include_pajak: true,
    });

    expect(newResep).toStrictEqual(mockResepDetailEntity);
    expect(saveSpy).toHaveBeenCalledTimes(2);
    expect(createSpy).toHaveBeenCalledWith({
      resep_id: 1,
      product_id: 1,
      product_name: 'p name',
      qty: 2,
      original_price: 3000,
      konfigurasi_harga: 1,
      include_pajak: true,
    });
  });

  it('should get all resep details', async () => {
    const repoSpy = jest
      .spyOn(repo, 'find')
      .mockResolvedValue([mockResepDetailEntity]);

    // expect(await service.getAll()).toStrictEqual([mockResepDetailEntity]);
    expect(repoSpy).toHaveBeenCalledWith({
      select: ['resep_id', 'product_id', 'product_name', 'qty', 'original_price', 'konfigurasi_harga', 'include_pajak'],
    });
  });
});
