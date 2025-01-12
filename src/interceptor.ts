import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  
  @Injectable()
  export class Interceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

      const response = context.switchToHttp().getResponse();

      response.status(201);

      return next.handle().pipe(
        map((data) => {

          function format(data){
            return {
              sunrise: data.sunrise,
              sunset: data.sunset,
              temp: data.temp,
              feels_like: data.feels_like,
              pressure: data.pressure,
              humidity: data.humidity,
              uvi: data.uvi,
              wind_speed: data.wind_speed,
            };
          }  

        let responce = {};
        if(data['current']){
          responce['current'] = format(data.current);
        }

        if (data['hourly']) {
          responce['hourly'] = data.hourly.map(format);
        }

        if (data['daily']) {
          responce['daily'] = data.daily.map(format);
        }

          return {
            status: 'data finded in the database',
            data: responce,
          };
        }),
      );
    }
    
  }
  