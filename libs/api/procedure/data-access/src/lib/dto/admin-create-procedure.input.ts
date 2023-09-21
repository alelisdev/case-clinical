import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@InputType()
export class AdminCreateProcedureInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field(() => [AdminCreatePriorAuthorizationProcedureCodeInput], { nullable: true }) 
  priorAuthorizationProcedureCodes?: AdminCreatePriorAuthorizationProcedureCodeInput[]


}