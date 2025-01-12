import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { FetchDto } from './dto/dto';
import { PrismaService } from 'prisma/prisma.service';
import { Interceptor } from './interceptor';
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
        const response_data = response.data;
        delete response_data.lat;
        delete response_data.lon;

        const exist = await this.prisma.weatherData.findMany({where:{
          lat: params.lat,
          lon: params.lon
        }})

        if(exist.length > 0){
          await this.prisma.weatherData.deleteMany({where:{
            lat: params.lat,
            lon: params.lon
          }})
        }

        const db_data = {
          lat: params.lat,
          lon: params.lon,
          data: response_data,
        }

        await this.prisma.weatherData.create({
          data: db_data
        });

        return {
          statusCode: 201,
          message: "data succesfully fetched and writed to database",
          db_data: db_data,
        };

    }catch(err){
      throw new NotFoundException('Something went wrong with API')
    }
  }


  async get(params: FetchDto): Promise<any> {
    const requestParams: any = {
      lat: params.lat,
      lon: params.lon,
    };

    try{

        let db_data = await this.prisma.weatherData.findFirst({
          where: requestParams
        })


        if(!db_data){
          return {
            statusCode: 200,
            message: "there is no such data in the database"
          };
        }

     
        if(params.part){
          const exclude = params.part.split(',');
          for(let i = 0; exclude.length > i; i++){
            delete db_data.data[exclude[i]];
          }
        }

       return db_data.data;

    }catch(err){
      throw new NotFoundException('Something went wrong with database')
    }
  }
}
