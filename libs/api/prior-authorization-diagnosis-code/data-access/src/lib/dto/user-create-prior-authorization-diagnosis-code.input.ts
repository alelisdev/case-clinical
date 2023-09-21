import { Field, InputType } from '@nestjs/graphql'

import { UserCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserCreatePriorAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => UserCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserCreateDiagnosisCodeInput  


  @Field(() => UserCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserCreatePriorAuthorizationRequestInput  

}
