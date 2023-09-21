import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateGuidelineInput } from './user-update-guideline.input'

@InputType()
export class UserUpdateGuidelinesInput {
  @Field(() => [UserUpdateGuidelineInput], {nullable: true }) 
  guidelines: UserUpdateGuidelineInput[]
}
