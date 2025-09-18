import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsOptional } from 'class-validator'
import { CreateItemDto } from './create-item.dto'

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @IsBoolean()
  completed?: boolean
}
