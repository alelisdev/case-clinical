import { Field, InputType } from '@nestjs/graphql'

import { UserCreateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access'
import { UserCreateRecommendedOrderAuthorizationInput } from '@case-clinical/api/recommended-order-authorization/data-access'
import {UserCreatePatientInput } from '@case-clinical/api/patient/data-access'
import {UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import {UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@InputType()
export class UserCreateRecommendedOrderInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  requestingProviderId?: string

  @Field(() => [UserCreateRecommendedOrderDiagnosisCodeInput], { nullable: true })
  diagnosisCodes?: UserCreateRecommendedOrderDiagnosisCodeInput[]

  @Field(() => [UserCreateRecommendedOrderAuthorizationInput], { nullable: true })
  authorizations?: UserCreateRecommendedOrderAuthorizationInput[]

  @Field({ nullable: true })
  status?: string

  @Field(() => UserCreatePatientInput, { nullable: true })
  patient?: UserCreatePatientInput

  @Field(() => UserCreateLegalCaseInput, { nullable: true })
  legalCase?: UserCreateLegalCaseInput

  @Field(() => UserCreateClinicalProviderInput, { nullable: true })
  requestingProvider?: UserCreateClinicalProviderInput

}
