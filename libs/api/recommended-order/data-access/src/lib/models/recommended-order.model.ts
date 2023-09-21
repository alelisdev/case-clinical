import { Field, ObjectType } from '@nestjs/graphql'

import { RecommendedOrderDiagnosisCode } from '@case-clinical/api/recommended-order-diagnosis-code/data-access'
import { RecommendedOrderAuthorization } from '@case-clinical/api/recommended-order-authorization/data-access'


@ObjectType()
export class RecommendedOrder {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  timeDelta?: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  requestingProviderId?: string

  @Field(() => [RecommendedOrderDiagnosisCode], { nullable: true })
  diagnosisCodes?: RecommendedOrderDiagnosisCode[]

  @Field(() => [RecommendedOrderAuthorization], { nullable: true })
  authorizations?: RecommendedOrderAuthorization[]

  @Field({ nullable: true })
  status?: string


}
