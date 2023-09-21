import { Field, InputType } from '@nestjs/graphql'

import { UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'
import { UserCreateProcedureOrTreatmentRequestAuthorizationInput } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'
import {UserCreatePatientInput } from '@case-clinical/api/patient/data-access'
import {UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import {UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import {UserCreateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'

@InputType()
export class UserCreateProcedureOrTreatmentRequestInput {

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

  @Field(() => UserCreatePatientInput, { nullable: true })
  patient?: UserCreatePatientInput

  @Field(() => UserCreateLegalCaseInput, { nullable: true })
  legalCase?: UserCreateLegalCaseInput

  @Field(() => UserCreateClinicalProviderInput, { nullable: true })
  requestingProvider?: UserCreateClinicalProviderInput

  @Field(() => UserCreateProcedureTypeInput, { nullable: true })
  procedureType?: UserCreateProcedureTypeInput

  @Field(() => [UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput], { nullable: true })
  diagnosisCodes?: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput[]

  @Field(() => [UserCreateProcedureOrTreatmentRequestAuthorizationInput], { nullable: true })
  authorizations?: UserCreateProcedureOrTreatmentRequestAuthorizationInput[]

  @Field({ nullable: true })
  status?: string


}
