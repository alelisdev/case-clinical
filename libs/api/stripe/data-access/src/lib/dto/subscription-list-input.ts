import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class SubscriptionListInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  status?: string
}
