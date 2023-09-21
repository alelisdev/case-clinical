import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorAuthGuidelineInput } from '@case-clinical/api/prior-auth-guideline/data-access' 


@InputType()
export class AdminUpdateGuidelineInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdatePriorAuthGuidelineInput], { nullable: true }) 
  priorAuthGuidelines?: UserUpdatePriorAuthGuidelineInput[]


}