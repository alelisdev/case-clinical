import { Field, ObjectType } from '@nestjs/graphql'

import { ProcedureOrTreatmentRequestDiagnosisCode } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'
import { ProcedureOrTreatmentRequestAuthorization } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'
import {Patient } from '@case-clinical/api/patient/data-access'
import {LegalCase } from '@case-clinical/api/legal-case/data-access'
import {ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import {ProcedureType } from '@case-clinical/api/procedure-type/data-access'

@ObjectType()
export class ProcedureOrTreatmentRequest {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

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

  @Field(() => Patient, { nullable: true })
  patient?: Patient

  @Field(() => LegalCase, { nullable: true })
  legalCase?: LegalCase

  @Field(() => ClinicalProvider, { nullable: true })
  requestingProvider?: ClinicalProvider

  @Field(() => ProcedureType, { nullable: true })
  procedureType?: ProcedureType

  @Field(() => [ProcedureOrTreatmentRequestDiagnosisCode], { nullable: true })
  diagnosisCodes?: ProcedureOrTreatmentRequestDiagnosisCode[]

  @Field(() => [ProcedureOrTreatmentRequestAuthorization], { nullable: true })
  authorizations?: ProcedureOrTreatmentRequestAuthorization[]

  @Field({ nullable: true })
  status?: string


}
