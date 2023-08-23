import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { GetUser } from '../auth/decorator';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwTGuard } from '../auth/guard';

@UseGuards(JwTGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('create')
  createCompany(
    @GetUser('email') userEmail: string,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.companyService.createCompany(userEmail, dto);
  }
}
