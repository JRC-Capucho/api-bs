import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ClientService } from './client.service';
import { ClientDto } from './dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  create(dto: ClientDto) {
    return this.clientService.create(dto);
  }

  @Patch(':id')
  update(@Body() dto: ClientDto, @Param('id', ParseIntPipe) clientId: number) {
    return this.clientService.update(dto, clientId);
  }

  @Get(':id')
  getClient(@Param('id', ParseIntPipe) clientId: number) {
    return this.clientService.read(clientId);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) clientId: number) {
    return this.clientService.delete(clientId);
  }
}
