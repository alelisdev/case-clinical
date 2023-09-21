import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 
import { UserUpdateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access'


@InputType()
export class UserUpdateProcedureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field(() => [UserUpdatePriorAuthorizationProcedureCodeInput], { nullable: true }) 
  priorAuthorizationProcedureCodes?: UserUpdatePriorAuthorizationProcedureCodeInput[]

  @Field(() => [UserUpdateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserUpdateClaimProcedureInput[]

}