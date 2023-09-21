import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateBillingInfoInput {
  @Field({ nullable: true })
  cardHolder?: string

  @Field({ nullable: true })
  cardNumber?: string

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
