import { IsInt, Max, Min, Type } from 'amala'

export default class {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip!: number
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  limit!: number
}
