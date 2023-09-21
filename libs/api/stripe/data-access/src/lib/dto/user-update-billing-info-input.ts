import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateBillingInfoInput {
  @Field({ nullable: true })
  cardHolder?: string

  @Field({ nullable: true })
  expireYear?: number

  @Field({ nullable: true })
  expireMonth?: number

  @Field({ nullable: true })
  zip?: string

  @Field({ nullable: true })
  country?: string
}
