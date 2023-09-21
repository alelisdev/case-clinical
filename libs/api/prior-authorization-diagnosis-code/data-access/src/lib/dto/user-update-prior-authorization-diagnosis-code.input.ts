import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserUpdatePriorAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => UserUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserUpdateDiagnosisCodeInput  


  @Field(() => UserUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserUpdatePriorAuthorizationRequestInput  

}