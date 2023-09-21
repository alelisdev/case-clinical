import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class Email {

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
  isPublic?: boolean

  @Field({ nullable: true }) 
  primary?: boolean

  @Field({ nullable: true }) 
  verified?: boolean

  @Field({ nullable: true }) 
  verifyToken?: string

  @Field({ nullable: true }) 
  verifyExpires?: Date

  @Field({ nullable: true }) 
  ownerId?: string

  @Field(() => User, { nullable: true }) 
  owner?: User  

}
