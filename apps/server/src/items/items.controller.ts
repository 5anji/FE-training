import { Controller, Get, Post, Body, Param, Patch, Delete, Sse } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { interval, map, switchMap } from 'rxjs';
import { from } from 'rxjs';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateItemDto) {
    // console.log(dto)
    return this.itemsService.create(dto.title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    // console.log(dto)
    return this.itemsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(Number(id));
  }

  // SSE endpoint: emits stats every 2 seconds
  @Sse('stats')
  stats() {
    return interval(250).pipe(
      // convert interval ticks into a promise -> observable that resolves to items list
      switchMap(() => from(this.itemsService.findAll())),
      map(all => ({
        data: {
          total: all.length,
          completed: all.filter(t => t.completed).length,
        },
      })),
    );
  }
}
