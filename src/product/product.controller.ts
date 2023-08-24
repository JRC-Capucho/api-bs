import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetUser } from '../auth/decorator';
import { JwTGuard } from '../auth/guard';
import { CreateProductDto, EditProductDto } from './dto';

@UseGuards(JwTGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(
    @GetUser('email') userEmail: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.createProduct(userEmail, dto);
  }

  @Patch(':id')
  editProduct(
    @GetUser('email') userEmail: string,
    @Body() dto: EditProductDto,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.editProduct(userEmail, dto, productId);
  }

  @Get()
  getProducts(@GetUser('email') userEmail: string) {
    return this.productService.getProducts(userEmail);
  }

  @Get(':id')
  searchProductById(
    @GetUser('email') userEmail: string,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.searchProductById(userEmail, productId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProductById(
    @GetUser('email') userEmail: string,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.deleteProductById(userEmail, productId);
  }
}
