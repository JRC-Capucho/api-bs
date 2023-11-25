import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class callDTo {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  client: number;

  @IsNumber()
  @IsOptional()
  priority: number;

  @IsNumber()
  @IsNotEmpty()
  occurrence: number;
}
