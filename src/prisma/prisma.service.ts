import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDB() {
    return this.$transaction([
      this.stockMovement.deleteMany(),
      this.sale.deleteMany(),
      this.product.deleteMany(),
      this.company.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
