import { Field, ObjectType } from '@nestjs/graphql'

import { DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'

import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'


@ObjectType()
export class PriorAuthorizationDiagnosisCode {

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
  priorAuthorizationRequestId?: string


  @Field(() => DiagnosisCode, { nullable: true }) 
  diagnosis?: DiagnosisCode  

  @Field(() => PriorAuthorizationRequest, { nullable: true }) 
  priorAuthorizationRequest?: PriorAuthorizationRequest  

}
