import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateResepDto } from './dto/create-resep.dto';
import { CreateResepDetailDto } from './dto/create-resepdetail.dto';
import { UpdateResepDetailDto } from './dto/update-resepdetail.dto';
import { ResepService } from './services/resep.service';
import { ResepDetailService } from './services/resepdetail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('resep')
@Controller('resep')
export class ResepController {
  constructor(
    private readonly resepService: ResepService,
    private readonly resepDetailService: ResepDetailService,
  ) {}

  @Post('create')
  async create(@Body() resep: CreateResepDto) {
    const status = resep.status;
    if (status != 'created' && status != 'cancelled' && status != 'confirmed') {
      return {
        message: 'Invalid Request',
        resep: {}
      }
    }

    const newResep = await this.resepService.createResep(resep);

    return {
      message: 'Resep created',
      resep: {
        resep_id: newResep.resep_id,
        nama_pasien: newResep.nama_pasien,
        nama_klinik: newResep.nama_klinik,
        nama_dokter: newResep.nama_dokter,
        total_harga: newResep.total_harga,
        status: newResep.status,
      },
    };
  }

  // @UseInterceptors(CacheInterceptor)
  @Get()
  async getReseps() {
    let reseps = await this.resepService.getAll();

    return {
      message: 'Resep retrieved successfully',
      reseps,
    };
  }

  @Post('detail/create')
  async createResepDetail(@Body() resepDetail: CreateResepDetailDto) {
    const exists = await this.resepDetailService.isResepDetailExists(resepDetail.resep_id, resepDetail.product_name);
    if (exists) {
      return {
        message: 'Product Already Exists',
        resep: {}
      }
    }
    
    const konfigurasi_harga = resepDetail.konfigurasi_harga;
    if (konfigurasi_harga != 1 && konfigurasi_harga != 2) {
      return {
        message: 'Invalid Request',
        resep: {}
      }
    }

    const newResepDetail = await this.resepDetailService.createResepDetail(resepDetail);

    return {
      message: 'Resep Detail created',
      resep: {
        resep_id: newResepDetail.resep_id,
        product_id: newResepDetail.product_id,
        product_name: newResepDetail.product_name,
        qty: newResepDetail.qty,
        original_price: newResepDetail.original_price,
        konfigurasi_harga: newResepDetail.konfigurasi_harga,
        include_pajak: newResepDetail.include_pajak,
      },
    };
  }

  @Get('detail/:resep_id')
  async getResepDetail(@Param('resep_id') resep_id: number) {
    let resep_details = await this.resepDetailService.getAllResepDetailByResepId(resep_id);

    return {
      message: 'Resep detail retrieved successfully',
      resep_details,
    };
  }
  
  @Put('detail/update/:resep_detail_id')
  async updateResepDetail(@Param('resep_detail_id') resep_detail_id: number, @Body() resepDetail: UpdateResepDetailDto) {    
    const konfigurasi_harga = resepDetail.konfigurasi_harga;
    if (konfigurasi_harga != 1 && konfigurasi_harga != 2) {

      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const newResepDetail = await this.resepDetailService.editResepDetail(resep_detail_id, resepDetail);

    return {
      message: 'Resep Detail updated',
      resep: {
        resep_id: newResepDetail.resep_id,
        product_id: newResepDetail.product_id,
        product_name: newResepDetail.product_name,
        qty: newResepDetail.qty,
        original_price: newResepDetail.original_price,
        konfigurasi_harga: newResepDetail.konfigurasi_harga,
        include_pajak: newResepDetail.include_pajak,
      },
    };
  }

  @Post('resep/checkout')
  async userCheckout(@Body() resep_id: number) {
    let resep = await this.resepService.userCheckout(resep_id);

    if (resep == null) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    }
    
    return {
      message: 'Checkout Success',
      resep,
    };
  }
}
