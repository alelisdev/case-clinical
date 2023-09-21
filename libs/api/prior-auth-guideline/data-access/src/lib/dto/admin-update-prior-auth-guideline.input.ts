import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateGuidelineInput } from '@case-clinical/api/guideline/data-access' 
import { AdminUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminUpdatePriorAuthGuidelineInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  guidelineId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => AdminUpdateGuidelineInput ,{ nullable: true }) 
  guideline?: AdminUpdateGuidelineInput  


  @Field(() => AdminUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminUpdatePriorAuthorizationRequestInput  

}