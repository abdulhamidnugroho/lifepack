import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResepEntity } from '../entities/resep.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateResepDto } from '../dto/create-resep.dto';
import { async } from 'rxjs';

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

  async getAll(): Promise<ResepEntity[]> {
    let reseps = await this.resepsRepository.find({
      relations: {
        resep_details: true,
      },
    });

    for (let resep_key in reseps) {
      let resep = reseps[resep_key];
      let total_price = 0;

      for (let detail_key in resep.resep_details) {
        let value = resep.resep_details[detail_key];
        let configured_price = value.original_price;

        if (value.konfigurasi_harga == 1) {
          configured_price += ((1/10) * value.original_price)
        }

        value.final_price       = ((11/100) * configured_price) + configured_price;
        value.total_harga_obat  = value.final_price * value.qty;

        total_price += value.total_harga_obat;
      }

      resep.total_harga = total_price;
    }

    return reseps;
  }
}
