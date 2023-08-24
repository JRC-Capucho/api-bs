import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { EditCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getUserId(userEmail: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user.id;
  }

  async getCompanyId(userEmail: string): Promise<number> {
    const userId = await this.getUserId(userEmail);

    const company = await this.prisma.company.findFirst({
      select: {
        id: true,
      },
      where: {
        userId: userId,
      },
    });

    if (!company) {
      throw new ForbiddenException('Company not found');
    }

    return company.id;
  }

  async createCompany(userEmail: string, dto: CreateCompanyDto) {
    const userId: number = await this.getUserId(userEmail);

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
    if (!dto) throw new ForbiddenException('No data');

    const companyId: number = await this.getCompanyId(userEmail);

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
