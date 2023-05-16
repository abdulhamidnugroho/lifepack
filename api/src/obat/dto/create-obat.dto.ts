import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateObatDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsInt()
  price: number;

  @IsInt()
  konfigurasi_harga_id: number;

  @IsBoolean()
  termasuk_pajak: boolean;
  
  @IsInt()
  stock: number;
}
