import { Field, ObjectType } from '@nestjs/graphql'

import { Authorization } from '@case-clinical/api/authorization/data-access'

import { ProcedureOrTreatmentRequest } from '@case-clinical/api/procedure-or-treatment-request/data-access'


@ObjectType()
export class ProcedureOrTreatmentRequestAuthorization {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => Authorization, { nullable: true }) 
  authorization?: Authorization  

  @Field(() => ProcedureOrTreatmentRequest, { nullable: true }) 
  procedureOrTreatmentRequest?: ProcedureOrTreatmentRequest  

}
