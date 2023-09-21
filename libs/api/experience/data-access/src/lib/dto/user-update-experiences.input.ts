import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateExperienceInput } from './user-update-experience.input'

@InputType()
export class UserUpdateExperiencesInput {
  @Field(() => [UserUpdateExperienceInput], {nullable: true }) 
  experiences: UserUpdateExperienceInput[]
}
