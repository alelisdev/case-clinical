import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'
import { UserUpdateProcedureOrTreatmentRequestAuthorizationInput } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'
import { AdminUpdatePatientInput } from '@case-clinical/api/patient/data-access'
import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'

@InputType()
export class AdminUpdateProcedureOrTreatmentRequestInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  facilityVendorId?: string

  @Field({ nullable: true })
  facilityContractId?: string

  @Field({ nullable: true })
  anesthesiaVendorId?: string

  @Field({ nullable: true })
  anesthesiaVendorContractId?: string

  @Field({ nullable: true })
  requestingProviderId?: string

  @Field({ nullable: true })
  procedureTypeId?: string

  @Field(() => AdminUpdatePatientInput, { nullable: true })
  patient?: AdminUpdatePatientInput

  @Field(() => AdminUpdateLegalCaseInput, { nullable: true })
  legalCase?: AdminUpdateLegalCaseInput

  @Field(() => AdminUpdateClinicalProviderInput, { nullable: true })
  requestingProvider?: AdminUpdateClinicalProviderInput

  @Field(() => AdminUpdateProcedureTypeInput, { nullable: true })
  procedureType?: AdminUpdateProcedureTypeInput

  @Field(() => [UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput], { nullable: true })
  diagnosisCodes?: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput[]

  @Field(() => [UserUpdateProcedureOrTreatmentRequestAuthorizationInput], { nullable: true })
  authorizations?: UserUpdateProcedureOrTreatmentRequestAuthorizationInput[]

  @Field({ nullable: true })
  status?: string


}
