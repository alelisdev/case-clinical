import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateTaskItemInput } from '@case-clinical/api/task-item/data-access' 
import { UserUpdateTagInput } from '@case-clinical/api/tag/data-access' 


@InputType()
export class UserUpdateTaskTagInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taskId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => UserUpdateTaskItemInput ,{ nullable: true }) 
  task?: UserUpdateTaskItemInput  


  @Field(() => UserUpdateTagInput ,{ nullable: true }) 
  tag?: UserUpdateTagInput  

}