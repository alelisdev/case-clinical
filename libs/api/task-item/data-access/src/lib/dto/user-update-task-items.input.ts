import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTaskItemInput } from './user-update-task-item.input'

@InputType()
export class UserUpdateTaskItemsInput {
  @Field(() => [UserUpdateTaskItemInput], {nullable: true }) 
  taskItems: UserUpdateTaskItemInput[]
}
