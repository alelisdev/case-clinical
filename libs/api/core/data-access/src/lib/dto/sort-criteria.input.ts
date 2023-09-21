import { Field, InputType, Int } from '@nestjs/graphql'
import { OrderByInput } from './order-by.input'

@InputType()
export class SortCriteriaInput {

  @Field(() => [OrderByInput])
  field: OrderByInput[]
}
