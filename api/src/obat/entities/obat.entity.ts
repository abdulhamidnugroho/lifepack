import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'obats',
})
export class ObatEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column()
  konfigurasi_harga_id: number;

  @Column()
  termasuk_pajak: boolean;

  @Column()
  stock: number;
}
