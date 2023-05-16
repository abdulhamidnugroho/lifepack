import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateResepDto {
  @IsNotEmpty()
  @IsString()
  nama_pasien: string;

  @IsNotEmpty()
  @IsString()
  nama_klinik: string;

  @IsNotEmpty()
  @IsString()
  nama_dokter: string;

  @IsNotEmpty()
  @IsInt()
  total_harga: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
