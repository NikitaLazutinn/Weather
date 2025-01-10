import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsIn,
  IsNumber,
  IsArray,
  IsString,
  ValidateIf,
} from 'class-validator';

export class FetchDto {
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
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
    console.log(value);
      const parts = value.split(',');
      const isValid = parts.every((part) => validValues.includes(part));
      if (!isValid) {
        throw new BadRequestException(`Invalid value in 'part'`);
      }
      return true;
    
  })
  part?: string;
}
