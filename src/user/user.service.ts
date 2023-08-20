import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userEmail: string, dto: UserDto) {
    const user = await this.prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }
}
