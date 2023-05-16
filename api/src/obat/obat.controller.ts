import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateObatDto } from './dto/create-obat.dto';
import { ObatService } from './services/obat.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { And } from 'typeorm';

@ApiTags('obat')
@Controller('obat')
export class ObatController {
  constructor(
    private readonly obatService: ObatService,
  ) {}

  @Post('create')
  async create(@Body() obat: CreateObatDto) {
    if (obat.konfigurasi_harga_id != 1 && obat.konfigurasi_harga_id != 2) {
      return {
        message: 'Invalid Request',
        obat: {}
      }
    }

    const newObat = await this.obatService.createObat(obat);

    return {
      message: 'Obat created',
      obat: {
        id: newObat.product_id,
        name: newObat.name,
        sku: newObat.sku,
        price: newObat.price,
        konfigurasi_harga_id: newObat.konfigurasi_harga_id,
        termasuk_pajak: newObat.termasuk_pajak,
        stock: newObat.stock,
      },
    };
  }

  // @UseInterceptors(CacheInterceptor)
  @Get()
  async getObats() {
    let obats = await this.obatService.getAll();

    for (let key in obats) {
      let value = obats[key];
      if (value.konfigurasi_harga_id == 1) {
        value.price += ((1/10) * value.price)
      }

      if (!value.termasuk_pajak) {
        value.price += ((11/100) * value.price)
      }
    }
    
    return {
      message: 'Obat retrieved successfully',
      obats,
    };
  }
}
