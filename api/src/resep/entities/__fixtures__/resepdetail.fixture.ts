import { ResepEntity } from '../resep.entity';
import { ResepDetailEntity } from '../resepdetail.entity';

export const mockResepDetailEntity: ResepDetailEntity = {
  resep_detail_id: 1,
  resep_id: 1,
  product_id: 1,
  product_name: 'p name',
  qty: 2,
  original_price: 3000,
  konfigurasi_harga: 1,
  include_pajak: true,
  resep: new ResepEntity
};
