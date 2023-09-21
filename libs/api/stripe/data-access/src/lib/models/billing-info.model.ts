import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BillingInfo {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  cardHolder?: string

  @Field({ nullable: true })
  last4?: string

  @Field({ nullable: true })
  expireYear?: number

  @Field({ nullable: true })
  expireMonth?: number

  @Field({ nullable: true })
  cvc?: string

  @Field({ nullable: true })
  zip?: string

  @Field({ nullable: true })
  country?: string
}
