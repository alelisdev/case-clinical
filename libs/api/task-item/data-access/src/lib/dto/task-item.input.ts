import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class TaskItemInput {

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

}
