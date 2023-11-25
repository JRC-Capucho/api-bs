import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ClientDto) {
    const client = await this.prisma.client.create({
      data: {
        ...dto,
      },
    });
    return client;
  }

  async update(dto: ClientDto, clientId: number) {
    const client = await this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        ...dto,
      },
    });
    return client;
  }

  async read(clientId: number) {
    const client = this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    return client;
  }

  async delete(clientId: number) {
    await this.prisma.client.delete({
      where: {
        id: clientId,
      },
    });
  }
}
