import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './app.service';
import { FetchDto } from './dto/dto';
import { Interceptor } from './interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('fetch')
  async fetchWeather(@Query()params: FetchDto) {
    return await this.weatherService.fetch(params);
  }

  @UseInterceptors(Interceptor)
  @Get('get')
  async getData(@Query()params: FetchDto) {
    return await this.weatherService.get(params);
  }
}
