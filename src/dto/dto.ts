import { BadRequestException} from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class FetchDto {
  @IsNumber()
  @Transform(({ value }) => {
    const parsedValue = parseFloat(value);
    if (parsedValue > 90 || parsedValue < -90) {
      throw new BadRequestException(`lat should be between -90 and 90`);
    }
    return parsedValue;
  })
  lat: number;

  @IsNumber()
  @Transform(({ value }) => {
  const parsedValue = parseFloat(value);
  if (parsedValue > 180 || parsedValue < -180) {
    throw new BadRequestException(`lon should be > -180 and < 180`);
  }
  return parsedValue})
  lon: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item)
        .join(',');
    
  })
  @ValidateIf((obj, value) => {
    if(!value){
      return true;
    }
    const validValues = ['current', 'minutely', 'hourly', 'daily', 'alerts'];
      const parts = value.split(',');
      const isValid = parts.every((part) => validValues.includes(part));
      if (!isValid) {
        throw new BadRequestException(`Invalid value in 'part'`);
      }
      return true;
    
  })
  part?: string;
}
