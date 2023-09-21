import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class TaskTagInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taskId?: string

  @Field({ nullable: true }) 
  tagId?: string
}
