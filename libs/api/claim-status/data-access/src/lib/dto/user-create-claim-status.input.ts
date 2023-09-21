import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 


@InputType()
export class UserCreateClaimStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserCreateClaimProcedureInput[]


}
