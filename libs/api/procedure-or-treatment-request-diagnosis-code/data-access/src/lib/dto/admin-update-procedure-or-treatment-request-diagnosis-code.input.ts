import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminUpdateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class AdminUpdateProcedureOrTreatmentRequestDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => AdminUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminUpdateDiagnosisCodeInput  


  @Field(() => AdminUpdateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: AdminUpdateProcedureOrTreatmentRequestInput  

}