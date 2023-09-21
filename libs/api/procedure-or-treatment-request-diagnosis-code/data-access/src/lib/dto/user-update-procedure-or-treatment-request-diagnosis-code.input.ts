import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserUpdateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => UserUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserUpdateDiagnosisCodeInput  


  @Field(() => UserUpdateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: UserUpdateProcedureOrTreatmentRequestInput  

}