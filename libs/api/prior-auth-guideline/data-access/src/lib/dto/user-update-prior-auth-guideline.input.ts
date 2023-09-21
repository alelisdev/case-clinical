import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateGuidelineInput } from '@case-clinical/api/guideline/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserUpdatePriorAuthGuidelineInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  guidelineId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => UserUpdateGuidelineInput ,{ nullable: true }) 
  guideline?: UserUpdateGuidelineInput  


  @Field(() => UserUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserUpdatePriorAuthorizationRequestInput  

}