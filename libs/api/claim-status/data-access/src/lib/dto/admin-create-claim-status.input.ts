import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 


@InputType()
export class AdminCreateClaimStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: AdminCreateClaimProcedureInput[]


}