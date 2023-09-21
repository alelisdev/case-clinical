import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SubscriptionResult {

  @Field({ nullable: true })
  status?: string
}
