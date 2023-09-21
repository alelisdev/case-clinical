import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 

@InputType()
export class UserCreateNavigationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  subtitle?: string

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  icon?: string

  @Field({ nullable: true }) 
  link?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  parentId?: string

  @Field(() => [UserCreateNavigationInput], { nullable: true }) 
  children?: UserCreateNavigationInput[]

  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  


  @Field(() => UserCreateNavigationInput ,{ nullable: true }) 
  parent?: UserCreateNavigationInput  

}
