import { Field, InputType } from '@nestjs/graphql'

import { UserCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserCreateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => UserCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserCreateDiagnosisCodeInput  


  @Field(() => UserCreateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: UserCreateProcedureOrTreatmentRequestInput  

}
