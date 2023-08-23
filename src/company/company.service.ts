import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

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
    console.log({ userId });

    console.log({ userId });
    const company = await this.prisma.company.create({
      data: {
        userId,
        ...dto,
      },
    });

    return company;
  }
}
