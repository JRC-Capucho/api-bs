import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Param,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { EditCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async createCompany(userEmail: string, dto: CreateCompanyDto) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email: userEmail,
      },
    });

    const userId: number = user.id;

    const company = await this.prisma.company.create({
      data: {
        userId,
        ...dto,
      },
    });

    delete company.id;
    delete company.userId;
    return company;
  }

  async editCompany(userEmail: string, dto: EditCompanyDto) {
    if (!dto) throw new BadRequestException('No data');
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email: userEmail,
      },
    });

    const userId: number = user.id;

    const aux = await this.prisma.company.findFirst({
      select: {
        id: true,
      },
      where: {
        userId: userId,
      },
    });

    const companyId: number = aux.id;

    const company = await this.prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        ...dto,
      },
    });

    delete company.id;
    delete company.userId;

    return company;
  }
}
