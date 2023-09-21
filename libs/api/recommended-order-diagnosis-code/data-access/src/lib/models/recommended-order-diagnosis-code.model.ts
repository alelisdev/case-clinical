import { Field, ObjectType } from '@nestjs/graphql'

import { DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'

import { RecommendedOrder } from '@case-clinical/api/recommended-order/data-access'


@ObjectType()
export class RecommendedOrderDiagnosisCode {

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
  recommendedOrderId?: string


  @Field(() => DiagnosisCode, { nullable: true }) 
  diagnosis?: DiagnosisCode  

  @Field(() => RecommendedOrder, { nullable: true }) 
  recommendedOrder?: RecommendedOrder  

}
