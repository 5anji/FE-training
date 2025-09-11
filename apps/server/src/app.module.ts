import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [ItemsModule],
  providers: [PrismaModule],
})
export class AppModule {}
