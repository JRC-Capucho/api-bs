import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ClientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsDate()
  @IsNotEmpty()
  birthDay: Date;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  company: string;
}
