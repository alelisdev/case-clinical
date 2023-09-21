import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateGuidelineInput } from '@case-clinical/api/guideline/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminCreatePriorAuthGuidelineInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  guidelineId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => AdminCreateGuidelineInput ,{ nullable: true }) 
  guideline?: AdminCreateGuidelineInput  


  @Field(() => AdminCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminCreatePriorAuthorizationRequestInput  

}