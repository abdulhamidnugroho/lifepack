import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class Resep1684258017643 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reseps',
                columns: [
                    {
                        name: 'resep_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nama_pasien',
                        type: 'varchar',
                    },
                    {
                        name: 'nama_klinik',
                        type: 'varchar',
                    },
                    {
                        name: 'nama_dokter',
                        type: 'varchar',
                    },
                    {
                        name: 'total_harga',
                        type: 'int',
                    },
                    {
                        name: 'status',
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
            'reseps',
            new TableIndex({
                name: 'IDX_PATIENT_NAME',
                columnNames: ['nama_pasien'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reseps');
    }

}
