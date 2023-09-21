import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class AdminUpdateReconciliationPeriodTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateContractInput], { nullable: true }) 
  contracts?: UserUpdateContractInput[]


}