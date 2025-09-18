import type { Item } from '@prisma/client'
import { PrismaService } from '../prisma.service' // eslint-disable-line
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(title: string): Promise<Item> {
    return this.prisma.item.create({ data: { title } })
  }

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany({ orderBy: { id: 'desc' } })
  }

  async update(id: number, data: Partial<Item>): Promise<Item> {
    const existing = await this.prisma.item.findUnique({ where: { id } })
    if (!existing) {
      throw new NotFoundException(`Item with ID ${id} not found`)
    }
    return this.prisma.item.update({ where: { id }, data })
  }

  async remove(id: number): Promise<Item> {
    const existing = await this.prisma.item.findUnique({ where: { id } })
    if (!existing) {
      throw new NotFoundException(`Item with ID ${id} not found`)
    }
    return this.prisma.item.delete({ where: { id } })
  }
}
