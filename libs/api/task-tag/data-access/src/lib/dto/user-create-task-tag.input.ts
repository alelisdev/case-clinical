import { Field, InputType } from '@nestjs/graphql'

import { UserCreateTaskItemInput } from '@case-clinical/api/task-item/data-access' 
import { UserCreateTagInput } from '@case-clinical/api/tag/data-access' 


@InputType()
export class UserCreateTaskTagInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taskId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => UserCreateTaskItemInput ,{ nullable: true }) 
  task?: UserCreateTaskItemInput  


  @Field(() => UserCreateTagInput ,{ nullable: true }) 
  tag?: UserCreateTagInput  

}
