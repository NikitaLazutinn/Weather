import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsIn,
  IsNumber,
  IsArray,
} from 'class-validator';

export class FetchDto {
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  lon: number;

  @IsOptional()
  @Transform(
    ({ value }) =>
      typeof value === 'string'
        ? value
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item)
        : value
  )
  @IsArray()
  @IsIn(['current', 'minutely', 'hourly', 'daily', 'alerts'], { each: true })
  part?: ('current' | 'minutely' | 'hourly' | 'daily' | 'alerts')[];
}
