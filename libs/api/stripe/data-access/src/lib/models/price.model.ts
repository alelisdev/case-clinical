import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Price {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  price?: number

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  currency?: string

  @Field({ nullable: true })
  interval?: string

  @Field({ nullable: true })
  subscribed?: boolean
}
