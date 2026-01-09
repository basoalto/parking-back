import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { Prize } from './entities/prize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prize])],
  controllers: [PrizeController],
  providers: [PrizeService],
  exports: [TypeOrmModule, PrizeService],
})
export class PrizeModule {}
