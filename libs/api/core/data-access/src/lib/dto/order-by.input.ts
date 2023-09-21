import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class OrderByInput {
  @Field(() => String)
  field: string

  @Field(() => String)
  operator: 'asc'|'desc'
}
