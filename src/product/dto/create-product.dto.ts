import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsNumber()
  @IsNotEmpty()
  quantityAvailable: number;

  @IsNumber()
  @IsOptional()
  quantityAvailableNextMonth?: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsOptional()
  experyDate?: Date;

  @IsString()
  @IsOptional()
  imgRef?: string;
}
