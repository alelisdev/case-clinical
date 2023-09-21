import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminUpdateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class AdminUpdateAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  authorizationId?: string


  @Field(() => AdminUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminUpdateDiagnosisCodeInput  


  @Field(() => AdminUpdateAuthorizationInput ,{ nullable: true }) 
  authorization?: AdminUpdateAuthorizationInput  

}