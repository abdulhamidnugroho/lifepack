import { ResepEntity } from '../resep.entity';
import { ResepDetailEntity } from '../resepdetail.entity';

export const mockResepEntity: ResepEntity = {
  resep_id: 1,
  nama_pasien: 'pasien',
  nama_klinik: 'klinik',
  nama_dokter: 'dokter',
  total_harga: 5000,
  status: 'created',
  resep_details: []
};
