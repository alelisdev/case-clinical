import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'

import { User } from '@case-clinical/api/user/data-access'
import { TaskTag } from '@case-clinical/api/task-tag/data-access' 


@ObjectType()
export class TaskItem {

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [TaskTag], { nullable: true }) 
  taskTags?: TaskTag[]


  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

  @Field(() => User, { nullable: true }) 
  assignedTo?: User  

}
