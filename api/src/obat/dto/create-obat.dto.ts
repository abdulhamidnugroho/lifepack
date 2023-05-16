import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateObatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsInt()
  konfigurasi_harga_id: number;

  @IsNotEmpty()
  @IsBoolean()
  termasuk_pajak: boolean;
  
  @IsNotEmpty()
  @IsInt()
  stock: number;
}
