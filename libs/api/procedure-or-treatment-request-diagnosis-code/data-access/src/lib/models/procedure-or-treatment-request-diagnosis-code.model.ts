import { Field, ObjectType } from '@nestjs/graphql'

import { DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'

import { ProcedureOrTreatmentRequest } from '@case-clinical/api/procedure-or-treatment-request/data-access'


@ObjectType()
export class ProcedureOrTreatmentRequestDiagnosisCode {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => DiagnosisCode, { nullable: true }) 
  diagnosis?: DiagnosisCode  

  @Field(() => ProcedureOrTreatmentRequest, { nullable: true }) 
  procedureOrTreatmentRequest?: ProcedureOrTreatmentRequest  

}
