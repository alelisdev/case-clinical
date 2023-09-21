import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePriorAuthGuidelineInput } from '@case-clinical/api/prior-auth-guideline/data-access' 


@InputType()
export class UserCreateGuidelineInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreatePriorAuthGuidelineInput], { nullable: true }) 
  priorAuthGuidelines?: UserCreatePriorAuthGuidelineInput[]


}
