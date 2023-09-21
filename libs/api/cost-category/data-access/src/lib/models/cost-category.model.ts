import { Field, ObjectType } from '@nestjs/graphql'

import { PriorAuthorizationProcedureCode } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@ObjectType()
export class CostCategory {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [PriorAuthorizationProcedureCode], { nullable: true }) 
  priorAuthorizationProcedureCodes?: PriorAuthorizationProcedureCode[]


}
