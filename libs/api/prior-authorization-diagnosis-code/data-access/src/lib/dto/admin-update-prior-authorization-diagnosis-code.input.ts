import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminUpdatePriorAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => AdminUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminUpdateDiagnosisCodeInput  


  @Field(() => AdminUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminUpdatePriorAuthorizationRequestInput  

}