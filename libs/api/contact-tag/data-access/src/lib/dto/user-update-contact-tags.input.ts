import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContactTagInput } from './user-update-contact-tag.input'

@InputType()
export class UserUpdateContactTagsInput {
  @Field(() => [UserUpdateContactTagInput], {nullable: true }) 
  contactTags: UserUpdateContactTagInput[]
}
