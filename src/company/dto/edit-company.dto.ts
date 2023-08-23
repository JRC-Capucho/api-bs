import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
