import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResepDetailEntity } from '../entities/resepdetail.entity';
import { Repository } from 'typeorm';
import { CreateResepDetailDto } from '../dto/create-resepdetail.dto';
import { UpdateResepDetailDto } from '../dto/update-resepdetail.dto';

@Injectable()
export class ResepDetailService {
  constructor(
    @InjectRepository(ResepDetailEntity)
    private resepDetailsRepository: Repository<ResepDetailEntity>,
  ) {}

  async isResepDetailExists(resep_id: number, product_name: string): Promise<ResepDetailEntity | null> {
    product_name = product_name.replace(/\s/g, "");
    return this.resepDetailsRepository.findOne({
      where: {
        resep_id: resep_id,
        product_name: product_name,
      },
    });
  }

  async createResepDetail(resepDetailDto: CreateResepDetailDto): Promise<ResepDetailEntity> {
    const resepDetailPayload = {
      resep_id: resepDetailDto.resep_id,
      product_id: resepDetailDto.product_id,
      product_name: resepDetailDto.product_name.replace(/\s/g, ""),
      qty: resepDetailDto.qty,
      original_price: resepDetailDto.original_price,
      konfigurasi_harga: resepDetailDto.konfigurasi_harga,
      include_pajak: resepDetailDto.include_pajak,
    };

    let newResepDetail = this.resepDetailsRepository.create(resepDetailPayload);
    newResepDetail = await this.updateResepDetail(newResepDetail);

    return await this.updateResepDetail(newResepDetail);
  }

  async updateResepDetail(newResepDetail: ResepDetailEntity): Promise<ResepDetailEntity> {
    return await this.resepDetailsRepository.save(newResepDetail);
  }

  async getAllResepDetailByResepId(resep_id: number): Promise<ResepDetailEntity[]> {
    try {
      let resepDetails = await this.resepDetailsRepository.findBy({ resep_id });

      for (let key in resepDetails) {
        let value = resepDetails[key];

        let configured_price = value.original_price;
        if (value.konfigurasi_harga == 1) {
          configured_price += ((1/10) * value.original_price)
        }

        value.final_price       = ((11/100) * configured_price) + configured_price;
        value.total_harga_obat  = value.final_price * value.qty;
      }

      return resepDetails
    } catch (err) {
      return err;
    }
  }

  async editResepDetail(resep_detail_id: number, resepDetailDto: UpdateResepDetailDto): Promise<ResepDetailEntity> {
    const resepDetailPayload = {
      resep_detail_id: resep_detail_id,
      qty: resepDetailDto.qty,
      original_price: resepDetailDto.original_price,
      konfigurasi_harga: resepDetailDto.konfigurasi_harga,
      include_pajak: resepDetailDto.include_pajak,
    };

    let newResepDetail = this.resepDetailsRepository.create(resepDetailPayload);
    newResepDetail = await this.updateResepDetail(newResepDetail);

    return await this.updateResepDetail(newResepDetail);
  }
}
