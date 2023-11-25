import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CallService } from './call.service';
import { callDTo } from './dto';

// @UseGuards(JwTGuard)
@Controller('call')
export class CallController {
  constructor(private callService: CallService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  createProduct(@Body() dto: callDTo) {
    return this.callService.registerCall(dto);
  }

  @Get()
  getData() {
    return this.callService.getDataMap();
  }
}
