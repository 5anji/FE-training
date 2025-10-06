import type { Item } from '@prisma/client'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Subject } from 'rxjs'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ItemsService {
  private readonly itemsChanged = new Subject<void>()

  constructor(private readonly prisma: PrismaService) {}

  get changes() {
    return this.itemsChanged.asObservable()
  }

  async create(title: string): Promise<Item> {
    const item = await this.prisma.item.create({ data: { title } })
    this.itemsChanged.next()
    return item
  }

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany({ orderBy: { id: 'desc' } })
  }

  async update(id: number, data: Partial<Item>): Promise<Item> {
    const existing = await this.prisma.item.findUnique({ where: { id } })
    if (!existing)
      throw new NotFoundException(`Item with ID ${id} not found`)

    const item = await this.prisma.item.update({ where: { id }, data })
    this.itemsChanged.next()
    return item
  }

  async remove(id: number): Promise<Item> {
    const existing = await this.prisma.item.findUnique({ where: { id } })
    if (!existing)
      throw new NotFoundException(`Item with ID ${id} not found`)

    const item = await this.prisma.item.delete({ where: { id } })
    this.itemsChanged.next()
    return item
  }
}
