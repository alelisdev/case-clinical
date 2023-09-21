import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminCreateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => AdminCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminCreateDiagnosisCodeInput  


  @Field(() => AdminCreateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: AdminCreateProcedureOrTreatmentRequestInput  

}