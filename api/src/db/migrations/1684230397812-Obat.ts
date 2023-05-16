import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class Obat1684230397812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'obats',
                columns: [
                    {
                        name: 'product_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'sku',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'int',
                    },
                    {
                        name: 'konfigurasi_harga_id',
                        type: 'int',
                    },
                    {
                        name: 'termasuk_pajak',
                        type: 'bool',
                    },
                    {
                        name: 'stock',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createIndex(
            'obats',
            new TableIndex({
                name: 'IDX_PRODUCT_NAME',
                columnNames: ['name'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('obats');
    }

}
