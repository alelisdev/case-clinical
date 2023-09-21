import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateTaskItemInput } from '@case-clinical/api/task-item/data-access' 
import { AdminCreateTagInput } from '@case-clinical/api/tag/data-access' 


@InputType()
export class AdminCreateTaskTagInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taskId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => AdminCreateTaskItemInput ,{ nullable: true }) 
  task?: AdminCreateTaskItemInput  


  @Field(() => AdminCreateTagInput ,{ nullable: true }) 
  tag?: AdminCreateTagInput  

}