import { Field, InputType } from '@nestjs/graphql'

import { UserCreateGuidelineInput } from '@case-clinical/api/guideline/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserCreatePriorAuthGuidelineInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  guidelineId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => UserCreateGuidelineInput ,{ nullable: true }) 
  guideline?: UserCreateGuidelineInput  


  @Field(() => UserCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserCreatePriorAuthorizationRequestInput  

}
