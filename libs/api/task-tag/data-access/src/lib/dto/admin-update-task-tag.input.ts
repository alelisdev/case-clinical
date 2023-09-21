import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateTaskItemInput } from '@case-clinical/api/task-item/data-access' 
import { AdminUpdateTagInput } from '@case-clinical/api/tag/data-access' 


@InputType()
export class AdminUpdateTaskTagInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taskId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => AdminUpdateTaskItemInput ,{ nullable: true }) 
  task?: AdminUpdateTaskItemInput  


  @Field(() => AdminUpdateTagInput ,{ nullable: true }) 
  tag?: AdminUpdateTagInput  

}