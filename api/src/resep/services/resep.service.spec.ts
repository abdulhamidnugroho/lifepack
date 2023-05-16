import { Test, TestingModule } from '@nestjs/testing';
import { ResepService } from './resep.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResepEntity } from '../entities/resep.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { mockResepEntity } from '../entities/__fixtures__/resep-entity.fixture';

describe('ResepService', () => {
  let service: ResepService;
  let repo: Repository<ResepEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResepService,
        ConfigService,
        {
          provide: getRepositoryToken(ResepEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResepService>(ResepService);
    repo = module.get<Repository<ResepEntity>>(getRepositoryToken(ResepEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to check resep existence', async () => {
    const findOneSpy = jest.spyOn(repo, 'findOne').mockResolvedValue(null);

    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        email: 'mail',
      },
    });
  });

  it('should be able to create resep', async () => {
    const createSpy = jest
      .spyOn(repo, 'create')
      .mockReturnValue(mockResepEntity);
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(mockResepEntity);

    const newResep = await service.createResep({
      nama_pasien: 'Pasien',
      nama_klinik: 'Klinik',
      nama_dokter: 'Dokter',
      total_harga: 5000,
      status: 'created',
    });

    expect(newResep).toStrictEqual(mockResepEntity);

    expect(saveSpy).toHaveBeenCalledTimes(2);
    expect(createSpy).toHaveBeenCalledWith({
      name: 'Resep Name',
      sku: 'sku',
      price: 1000,
      konfigurasi_harga_id: 1,
      termasuk_pajak: true,
      stock: 10,
    });
  });

  it('should get all reseps', async () => {
    const repoSpy = jest
      .spyOn(repo, 'find')
      .mockResolvedValue([mockResepEntity]);

    expect(await service.getAll()).toStrictEqual([mockResepEntity]);
    expect(repoSpy).toHaveBeenCalledWith({
      select: ['resep_id', 'nama_pasien', 'nama_klinik', 'nama_dokter', 'total_harga', 'status'],
    });
  });
});
