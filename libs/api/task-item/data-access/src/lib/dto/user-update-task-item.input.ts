import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdateTaskTagInput } from '@case-clinical/api/task-tag/data-access' 


@InputType()
export class UserUpdateTaskItemInput {

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateTaskTagInput], { nullable: true }) 
  taskTags?: UserUpdateTaskTagInput[]


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserUpdateLegalCaseInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  assignedTo?: UserUpdateUserInput  

}