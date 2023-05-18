import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResepEntity } from '../entities/resep.entity';
import { ObatEntity } from '../../obat/entities/obat.entity';
import { Repository } from 'typeorm';
import { CreateResepDto } from '../dto/create-resep.dto';

@Injectable()
export class ResepService {
  constructor(
    @InjectRepository(ResepEntity)
    private resepsRepository: Repository<ResepEntity>,
    private obatsRepository: Repository<ObatEntity>,
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

  async getResep(resep_id: number): Promise<ResepEntity> {
    return this.resepsRepository.findOneOrFail({
      where: {
        resep_id: resep_id,
      },
      relations: {
        resep_details: true,
      }
  });
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

  async userCheckout(resep_id: number) {
    let resep = await this.getResep(resep_id);
    
    if (resep.status != 'created') {
      return null;
    }
    
    for (let key in resep?.resep_details) {
      // Stock Update
      let details = resep.resep_details;
      const product_id = details[key as any].product_id;
      const product = await this.obatsRepository.findOneOrFail({
        where: {
          product_id: product_id,
        },
      });

      let finalStock = product.stock

      finalStock -= details[key as any].qty
      this.obatsRepository.update({product_id: product_id }, {stock: finalStock})

      // Status Update
      this.resepsRepository.update({resep_id: resep_id}, {status: 'confirmed'})
    }

    return resep;
  }

  async userCancelCheckout(resep_id: number) {
    let resep = await this.getResep(resep_id);

    if (resep.status != 'confirmed') {
      return null;
    }

    for (let key in resep?.resep_details) {
      // Stock Update
      let details = resep.resep_details;
      const product_id = details[key as any].product_id;
      const product = await this.obatsRepository.findOneOrFail({
        where: {
          product_id: product_id,
        },
      });

      let finalStock = product.stock

      finalStock += details[key as any].qty
      this.obatsRepository.update({product_id: product_id }, {stock: finalStock})

      // Status Update
      this.resepsRepository.update({resep_id: resep_id}, {status: 'cancelled'})
    }

    return resep;
  }
}
