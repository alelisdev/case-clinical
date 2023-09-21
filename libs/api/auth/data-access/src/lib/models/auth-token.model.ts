import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthToken {
  @Field({ description: 'JWT Bearer token' })
  token: string

  @Field({ description: 'Claims Payload' })
  features: string

  @Field({ nullable: true })
  verified?: boolean

  @Field({ nullable: true })
  signupStatus?: number

  @Field({ nullable: true })
  subscriberId?: string
}
