import { CreateItemDto } from './create-item.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
