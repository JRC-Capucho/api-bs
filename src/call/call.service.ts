import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { callDTo } from './dto';

@Injectable()
export class CallService {
  constructor(private prisma: PrismaService) {}

  registerCall(dto: callDTo) {
    this.prisma.call.create({
      data: {
        ...dto,
      },
    });
  }

  async getDataMap() {
    const data = await this.prisma.call.findMany();

    return data;
  }
}
