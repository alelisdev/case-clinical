import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateNavigationInput {

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

  @Field(() => [AdminCreateNavigationInput], { nullable: true }) 
  children?: AdminCreateNavigationInput[]


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  


  @Field(() => AdminCreateNavigationInput ,{ nullable: true }) 
  parent?: AdminCreateNavigationInput  

}