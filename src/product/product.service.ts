import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto, EditProductDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getUserIdAndCompanyId(
    userEmail: string,
  ): Promise<{ userId: number; companyId: number }> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email: userEmail,
      },
    });

    const userId: number = user.id;

    const company = await this.prisma.company.findFirst({
      select: {
        id: true,
      },
      where: {
        userId: userId,
      },
    });

    const companyId: number = company.id;

    return { userId, companyId };
  }

  async createProduct(userEmail: string, dto: CreateProductDto) {
    const { companyId } = await this.getUserIdAndCompanyId(userEmail);

    const product = await this.prisma.product.create({
      data: {
        companyId: companyId,
        ...dto,
      },
    });

    return product;
  }

  async editProduct(userEmail: string, dto: EditProductDto, productId: number) {
    const { companyId } = await this.getUserIdAndCompanyId(userEmail);

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.companyId !== companyId)
      throw new ForbiddenException("Don't permission access to do");

    const productUpdate = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });
    return productUpdate;
  }

  async getProducts(userEmail: string) {
    const { companyId } = await this.getUserIdAndCompanyId(userEmail);

    const product = this.prisma.product.findMany({
      where: {
        companyId: companyId,
      },
    });

    if (!product) throw new ForbiddenException('No products');
    return product;
  }

  async searchProductById(userEmail: string, productId: number) {
    const { companyId } = await this.getUserIdAndCompanyId(userEmail);
    const product = this.prisma.product.findUnique({
      where: {
        id: productId,
        companyId,
      },
    });

    if (!product) throw new ForbiddenException('No product');

    return product;
  }

  async deleteProductById(userEmail: string, productId: number) {
    const { companyId } = await this.getUserIdAndCompanyId(userEmail);

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.companyId !== companyId)
      throw new ForbiddenException("Don't have permission to do");

    await this.prisma.product.delete({
      where: {
        id: productId,
        companyId,
      },
    });
  }
}
