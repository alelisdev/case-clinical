import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorAuthGuidelineInput } from '@case-clinical/api/prior-auth-guideline/data-access' 


@InputType()
export class AdminCreateGuidelineInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreatePriorAuthGuidelineInput], { nullable: true }) 
  priorAuthGuidelines?: AdminCreatePriorAuthGuidelineInput[]


}