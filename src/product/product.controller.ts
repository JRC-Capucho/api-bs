import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  createProduct() {}

  editProduct() {}

  getProducts() {}

  searchProductById() {}

  editProductById() {}

  deleteProductById() {}
}
