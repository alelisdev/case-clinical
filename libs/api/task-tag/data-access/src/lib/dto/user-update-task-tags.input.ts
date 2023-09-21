import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTaskTagInput } from './user-update-task-tag.input'

@InputType()
export class UserUpdateTaskTagsInput {
  @Field(() => [UserUpdateTaskTagInput], {nullable: true }) 
  taskTags: UserUpdateTaskTagInput[]
}
