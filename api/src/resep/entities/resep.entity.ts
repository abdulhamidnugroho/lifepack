import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'reseps',
})
export class ResepEntity {
  @PrimaryGeneratedColumn()
  resep_id: number;

  @Column()
  nama_pasien: string;

  @Column()
  nama_klinik: string;

  @Column()
  nama_dokter: string;

  @Column()
  total_harga: number;

  @Column()
  status: string;
}
