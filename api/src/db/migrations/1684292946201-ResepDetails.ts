import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class ResepDetails1684292946201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'resep_details',
                columns: [
                    {
                        name: 'resep_detail_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'resep_id',
                        type: 'int',
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                    },
                    {
                        name: 'product_name',
                        type: 'varchar',
                    },
                    {
                        name: 'qty',
                        type: 'int',
                    },
                    {
                        name: 'original_price',
                        type: 'int',
                    },
                    {
                        name: 'konfigurasi_harga',
                        type: 'int',
                    },
                    {
                        name: 'include_pajak',
                        type: 'bool',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
