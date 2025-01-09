import { Module } from '@nestjs/common';
import {WeatherController} from './app.controller';
import {WeatherService} from './app.service';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {}
