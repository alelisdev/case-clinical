import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserUpdateNavigationInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateNavigationInput], { nullable: true }) 
  children?: UserUpdateNavigationInput[]


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput  


  @Field(() => UserUpdateNavigationInput ,{ nullable: true }) 
  parent?: UserUpdateNavigationInput  

}