import { Module } from '@nestjs/common';
import {WeatherController} from './app.controller';
import {WeatherService} from './app.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {}
