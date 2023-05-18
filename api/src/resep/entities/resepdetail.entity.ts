import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ResepEntity } from './resep.entity';

@Entity({
  name: 'resep_details',
})
export class ResepDetailEntity {
  @PrimaryGeneratedColumn()
  resep_detail_id: number;

  @Column()
  resep_id: number;

  @Column()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  qty: number;

  @Column()
  original_price: number;
  
  @Column()
  konfigurasi_harga: number;

  @Column()
  include_pajak: boolean;

  final_price?: number;
  total_harga_obat?: number;

  @ManyToOne(() => ResepEntity, (resep) => resep.resep_details)
  @JoinColumn({ name: "resep_id" })
  resep: ResepEntity;
}
