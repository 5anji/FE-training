import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Sse,
} from '@nestjs/common'
import { from, map, startWith, switchMap } from 'rxjs'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { ItemsService } from './items.service'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll()
  }

  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto.title)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemsService.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(Number(id))
  }

  @Sse('stats')
  stats() {
    return this.itemsService.changes.pipe(
      startWith(null),
      switchMap(() => from(this.itemsService.findAll())),
      map(all => ({
        data: {
          total: all.length,
          completed: all.filter(t => t.completed).length,
        },
      })),
    )
  }
}
