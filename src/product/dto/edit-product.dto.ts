import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class EditProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsNumber()
  @IsOptional()
  quantityAvailable?: number;

  @IsNumber()
  @IsOptional()
  quantityAvailableNextMonth?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  experyDate?: Date;

  @IsString()
  @IsOptional()
  imgRef?: string;
}
