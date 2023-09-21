import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class WebNotification {

  @Field({ nullable: true })
  id?: string
  
  @Field({ nullable: true })
  createdAt?: Date
  
  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  isAdmin?: boolean

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  subscribed?: boolean
}
