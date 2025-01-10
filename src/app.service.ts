import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { FetchDto } from './dto/dto';
import { PrismaService } from 'prisma/prisma.service';
dotenv.config();
@Injectable()
export class WeatherService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private readonly apiKey = process.env.WEATHER_API_KEY;
  private readonly apiUrl = process.env.WEATHER_API_URL;

  async fetch(params: FetchDto): Promise<any> {
    const requestParams: any = {
      appid: this.apiKey,
      lat: params.lat,
      lon: params.lon,
    };

    if (params.part) {
      requestParams.exclude = params.part;
    }
    try{
        const response = await axios.get(this.apiUrl, { params: requestParams });

        await this.prisma.weatherData.create({
          data: {
            lat: params.lat,
            lon: params.lon,
            data: response.data,
          },
        });

        return {
          statusCode: 201,
          text: "data succesfully fetched and writed to database",
          data: response.data,
        };

    }catch(err){
      throw new NotFoundException('Something went wrong with API')
    }
  }
}
