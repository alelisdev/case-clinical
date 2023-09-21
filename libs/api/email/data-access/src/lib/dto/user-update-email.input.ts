import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserUpdateEmailInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  owner?: UserUpdateUserInput  

}