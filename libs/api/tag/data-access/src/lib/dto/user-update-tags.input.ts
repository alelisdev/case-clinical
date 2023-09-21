import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTagInput } from './user-update-tag.input'

@InputType()
export class UserUpdateTagsInput {
  @Field(() => [UserUpdateTagInput], {nullable: true }) 
  tags: UserUpdateTagInput[]
}
