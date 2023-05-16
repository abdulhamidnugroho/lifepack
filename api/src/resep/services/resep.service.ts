import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResepEntity } from '../entities/resep.entity';
import { Repository } from 'typeorm';
import { CreateResepDto } from '../dto/create-resep.dto';

@Injectable()
export class ResepService {
  constructor(
    @InjectRepository(ResepEntity)
    private resepsRepository: Repository<ResepEntity>,
  ) {}


  async createResep(resepDto: CreateResepDto): Promise<ResepEntity> {
    const resepPayload = {
      nama_pasien: resepDto.nama_pasien,
      nama_klinik: resepDto.nama_klinik,
      nama_dokter: resepDto.nama_dokter,
      total_harga: resepDto.total_harga,
      status: resepDto.status,
    };

    let newResep = this.resepsRepository.create(resepPayload);
    newResep = await this.updateResep(newResep);

    return await this.updateResep(newResep);
  }

  async updateResep(newResep: ResepEntity): Promise<ResepEntity> {
    return await this.resepsRepository.save(newResep);
  }

  public getAll(): Promise<ResepEntity[]> {
    return this.resepsRepository.find({
      select: ['resep_id', 'nama_pasien', 'nama_klinik', 'nama_dokter', 'total_harga', 'status'],
    });
  }
}
