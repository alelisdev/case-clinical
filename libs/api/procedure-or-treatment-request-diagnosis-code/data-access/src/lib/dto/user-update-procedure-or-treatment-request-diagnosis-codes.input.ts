import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput } from './user-update-procedure-or-treatment-request-diagnosis-code.input'

@InputType()
export class UserUpdateProcedureOrTreatmentRequestDiagnosisCodesInput {
  @Field(() => [UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput], {nullable: true }) 
  procedureOrTreatmentRequestDiagnosisCodes: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput[]
}
