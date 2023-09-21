import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Plan {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  isMine?: boolean | false

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  detail?: string

  @Field({ nullable: true })
  price?: number
}
