import { Module } from '@nestjs/common';
import { ResepController } from './resep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResepEntity } from './entities/resep.entity';
import { ResepService } from './services/resep.service';
import { ConfigModule } from '@nestjs/config';
import { AppCacheModule } from '../app-cache/app-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResepEntity]),
    ConfigModule,
    AppCacheModule,
  ],
  controllers: [ResepController],
  providers: [
    ResepService,
  ],
})
export class ResepModule {}
