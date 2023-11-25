import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';

@Module({
  providers: [CallService],
  controllers: [CallController],
})
export class CallModule {}
