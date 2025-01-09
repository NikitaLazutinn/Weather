import { Controller, Get, Post, Query } from '@nestjs/common';
import { WeatherService } from './app.service';
import { FetchDto } from './dto/dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('fetch')
  async fetchWeather(@Query()params: FetchDto) {
    return await this.weatherService.fetch(params);
  }
}
