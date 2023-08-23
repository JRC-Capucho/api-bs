import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    ProductModule,
    CompanyModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class AppModule {}
