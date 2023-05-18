import { IsBoolean, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateResepDetailDto {
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
