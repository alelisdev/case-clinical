import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 
import { UserCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access'


@InputType()
export class UserCreateProcedureInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field(() => [UserCreatePriorAuthorizationProcedureCodeInput], { nullable: true }) 
  priorAuthorizationProcedureCodes?: UserCreatePriorAuthorizationProcedureCodeInput[]

  @Field(() => [UserCreateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserCreateClaimProcedureInput[]

}
