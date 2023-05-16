import { Module } from '@nestjs/common';
import { ObatController } from './obat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObatEntity } from './entities/obat.entity';
import { ObatService } from './services/obat.service';
import { ConfigModule } from '@nestjs/config';
import { AppCacheModule } from '../app-cache/app-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObatEntity]),
    ConfigModule,
    AppCacheModule,
  ],
  controllers: [ObatController],
  providers: [
    ObatService,
  ],
})
export class ObatModule {}
