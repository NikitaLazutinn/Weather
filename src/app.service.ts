import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { FetchDto } from './dto/dto';
dotenv.config();
@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.WEATHER_API_KEY;
  private readonly apiUrl = process.env.WEATHER_API_URL;

  async fetch(params: FetchDto): Promise<any> {
    const response = await axios.get(this.apiUrl, {
      params: {
        appid: this.apiKey,
        lat: params.lat,
        lon: params.lon,
        exclude: params.part
      },
    });

    console.log(params.part);

    
    return response.data;
  }
}
