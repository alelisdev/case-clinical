import { Field, ObjectType } from '@nestjs/graphql'

import { PriorAuthorizationProcedureCode } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 
import { ClaimProcedure } from '@case-clinical/api/claim-procedure/data-access'


@ObjectType()
export class Procedure {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field(() => [PriorAuthorizationProcedureCode], { nullable: true }) 
  priorAuthorizationProcedureCodes?: PriorAuthorizationProcedureCode[]

  @Field(() => [ClaimProcedure], { nullable: true }) 
  claimProcedures?: ClaimProcedure[]
}
