import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateTaskTagInput } from '@case-clinical/api/task-tag/data-access' 


@InputType()
export class UserCreateTaskItemInput {

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  order?: number

  @Field({ nullable: true }) 
  priority?: number

  @Field({ nullable: true }) 
  assignedToId?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  dueDate?: Date

  @Field({ nullable: true }) 
  assignedDate?: Date

  @Field({ nullable: true }) 
  completedOn?: Date

  @Field({ nullable: true }) 
  completed?: boolean

  @Field(() => [UserCreateTaskTagInput], { nullable: true }) 
  taskTags?: UserCreateTaskTagInput[]


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  assignedTo?: UserCreateUserInput  

}
