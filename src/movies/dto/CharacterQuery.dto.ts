import { IsEnum, IsOptional } from 'class-validator';
export enum FilterEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export enum SortEnum {
  NAME = 'name',
  GENDER = 'gender',
  HEIGHT = 'height',
}

export enum OrderEnum {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}
export class CharacterQueryDto {
  @IsOptional()
  @IsEnum(FilterEnum, {
    message: "filter must be a valid enum value of ['male', 'female']",
  })
  filter: string;

  @IsOptional()
  @IsEnum(SortEnum, {
    message: "sort must be a valid enum value of ['name', 'gender', 'height']",
  })
  sort: string;

  @IsOptional()
  @IsEnum(OrderEnum, {
    message: "order must be a valid enum value of ['asc', 'desc']",
  })
  order: string;
}
