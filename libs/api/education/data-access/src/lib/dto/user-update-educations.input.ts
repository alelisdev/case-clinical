import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateEducationInput } from './user-update-education.input'

@InputType()
export class UserUpdateEducationsInput {
  @Field(() => [UserUpdateEducationInput], {nullable: true }) 
  educations: UserUpdateEducationInput[]
}
