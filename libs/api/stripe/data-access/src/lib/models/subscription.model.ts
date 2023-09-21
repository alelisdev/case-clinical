import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PriceSubscription {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  priceId?: string

  @Field({ nullable: true })
  status?: string
}
