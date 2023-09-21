import { Field, ObjectType } from '@nestjs/graphql'

import { TaskItem } from '@case-clinical/api/task-item/data-access'

import { Tag } from '@case-clinical/api/tag/data-access'


@ObjectType()
export class TaskTag {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taskId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => TaskItem, { nullable: true }) 
  task?: TaskItem  

  @Field(() => Tag, { nullable: true }) 
  tag?: Tag  

}
