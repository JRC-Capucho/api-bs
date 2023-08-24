import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { GetUser } from '../auth/decorator';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwTGuard } from '../auth/guard';
import { EditCompanyDto } from './dto';

@UseGuards(JwTGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  createCompany(
    @GetUser('email') userEmail: string,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.companyService.createCompany(userEmail, dto);
  }

  @Patch()
  editCompany(
    @GetUser('email') userEmail: string,
    @Body() dto: EditCompanyDto,
  ) {
    return this.companyService.editCompany(userEmail, dto);
  }
}
