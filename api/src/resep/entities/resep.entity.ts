import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ResepDetailEntity } from './resepdetail.entity';

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
  
  @OneToMany(() => ResepDetailEntity, (resep_detail) => resep_detail.resep)
  @JoinColumn({ name: "resep_id" })
  resep_details: ResepDetailEntity[];
}

