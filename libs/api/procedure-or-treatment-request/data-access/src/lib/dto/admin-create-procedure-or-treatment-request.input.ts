import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'
import { AdminCreateProcedureOrTreatmentRequestAuthorizationInput } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'
import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access'
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminCreateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'


@InputType()
export class AdminCreateProcedureOrTreatmentRequestInput {

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

  @Field(() => AdminCreatePatientInput, { nullable: true })
  patient?: AdminCreatePatientInput

  @Field(() => AdminCreateLegalCaseInput, { nullable: true })
  legalCase?: AdminCreateLegalCaseInput

  @Field(() => AdminCreateClinicalProviderInput, { nullable: true })
  requestingProvider?: AdminCreateClinicalProviderInput

  @Field(() => AdminCreateProcedureTypeInput, { nullable: true })
  procedureType?: AdminCreateProcedureTypeInput

  @Field(() => [AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput], { nullable: true })
  diagnosisCodes?: AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput[]

  @Field(() => [AdminCreateProcedureOrTreatmentRequestAuthorizationInput], { nullable: true })
  authorizations?: AdminCreateProcedureOrTreatmentRequestAuthorizationInput[]

  @Field({ nullable: true })
  status?: string


}
