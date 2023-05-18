import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResepDetailDto {
  @IsNotEmpty()
  @IsNumber()
  resep_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNotEmpty()
  @IsInt()
  qty: number;

  @IsNotEmpty()
  @IsNumber()
  original_price: number;
  
  @IsNotEmpty()
  @IsInt()
  konfigurasi_harga: number;

  @IsNotEmpty()
  @IsBoolean()
  include_pajak: boolean;
}
