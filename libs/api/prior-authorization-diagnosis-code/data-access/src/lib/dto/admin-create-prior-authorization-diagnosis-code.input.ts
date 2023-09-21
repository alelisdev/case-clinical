import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminCreatePriorAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => AdminCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminCreateDiagnosisCodeInput  


  @Field(() => AdminCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminCreatePriorAuthorizationRequestInput  

}