import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateResepDto } from './dto/create-resep.dto';
import { ResepService } from './services/resep.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('resep')
@Controller('resep')
export class ResepController {
  constructor(
    private readonly resepService: ResepService,
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
}
