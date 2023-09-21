import { Field, ObjectType } from '@nestjs/graphql'

import { ClaimProcedure } from '@case-clinical/api/claim-procedure/data-access' 


@ObjectType()
export class ClaimStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [ClaimProcedure], { nullable: true }) 
  claimProcedures?: ClaimProcedure[]


}
