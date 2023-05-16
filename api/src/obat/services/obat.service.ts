import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObatEntity } from '../entities/obat.entity';
import { Repository } from 'typeorm';
import { CreateObatDto } from '../dto/create-obat.dto';
import { time } from 'console';

@Injectable()
export class ObatService {
  constructor(
    @InjectRepository(ObatEntity)
    private obatsRepository: Repository<ObatEntity>,
  ) {}


  async createObat(obatDto: CreateObatDto): Promise<ObatEntity> {
    const obatPayload = {
      name: obatDto.name,
      sku: obatDto.sku,
      price: obatDto.price,
      konfigurasi_harga_id: obatDto.konfigurasi_harga_id,
      termasuk_pajak: obatDto.termasuk_pajak,
      stock: obatDto.stock
    };

    let newObat = this.obatsRepository.create(obatPayload);
    newObat = await this.updateObat(newObat);

    return await this.updateObat(newObat);
  }

  async updateObat(newObat: ObatEntity): Promise<ObatEntity> {
    return await this.obatsRepository.save(newObat);
  }

  public getAll(): Promise<ObatEntity[]> {
    return this.obatsRepository.find({
      select: ['product_id', 'name', 'sku', 'price', 'konfigurasi_harga_id', 'termasuk_pajak', 'stock'],
    });
  }
}
