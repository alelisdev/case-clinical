import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthGuidelineInput } from './user-update-prior-auth-guideline.input'

@InputType()
export class UserUpdatePriorAuthGuidelinesInput {
  @Field(() => [UserUpdatePriorAuthGuidelineInput], {nullable: true }) 
  priorAuthGuidelines: UserUpdatePriorAuthGuidelineInput[]
}
