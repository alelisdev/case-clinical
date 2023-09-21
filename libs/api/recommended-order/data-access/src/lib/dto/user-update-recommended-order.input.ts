import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access'
import { UserUpdateRecommendedOrderAuthorizationInput } from '@case-clinical/api/recommended-order-authorization/data-access'
import {UserUpdatePatientInput } from '@case-clinical/api/patient/data-access'
import {UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import {UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@InputType()
export class UserUpdateRecommendedOrderInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  requestingProviderId?: string

  @Field(() => UserUpdatePatientInput, { nullable: true })
  patient?: UserUpdatePatientInput

  @Field(() => UserUpdateLegalCaseInput, { nullable: true })
  legalCase?: UserUpdateLegalCaseInput

  @Field(() => UserUpdateClinicalProviderInput, { nullable: true })
  requestingProvider?: UserUpdateClinicalProviderInput

  @Field(() => [UserUpdateRecommendedOrderDiagnosisCodeInput], { nullable: true })
  diagnosisCodes?: UserUpdateRecommendedOrderDiagnosisCodeInput[]

  @Field(() => [UserUpdateRecommendedOrderAuthorizationInput], { nullable: true })
  authorizations?: UserUpdateRecommendedOrderAuthorizationInput[]

  @Field({ nullable: true })
  status?: string


}
