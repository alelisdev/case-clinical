import { Field, ObjectType } from '@nestjs/graphql'

import { DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'

import { Authorization } from '@case-clinical/api/authorization/data-access'


@ObjectType()
export class AuthorizationDiagnosisCode {

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
  authorizationId?: string


  @Field(() => DiagnosisCode, { nullable: true }) 
  diagnosis?: DiagnosisCode  

  @Field(() => Authorization, { nullable: true }) 
  authorization?: Authorization  

}
