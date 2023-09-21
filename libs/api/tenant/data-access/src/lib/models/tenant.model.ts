import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tenant {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  logo_url?: string
}
