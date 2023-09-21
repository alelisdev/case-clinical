import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateGuidelineUsedInput } from './user-update-guideline-used.input'

@InputType()
export class UserUpdateGuidelineUsedsInput {
  @Field(() => [UserUpdateGuidelineUsedInput], {nullable: true }) 
  guidelineUseds: UserUpdateGuidelineUsedInput[]
}
