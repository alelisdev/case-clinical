import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Search {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string
}
