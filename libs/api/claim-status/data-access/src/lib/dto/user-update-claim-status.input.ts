import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 


@InputType()
export class UserUpdateClaimStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserUpdateClaimProcedureInput[]


}