import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateNavigationInput {

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

  @Field(() => [AdminUpdateNavigationInput], { nullable: true }) 
  children?: AdminUpdateNavigationInput[]

  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  


  @Field(() => AdminUpdateNavigationInput ,{ nullable: true }) 
  parent?: AdminUpdateNavigationInput  

}