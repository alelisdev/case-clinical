import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class UserCreateReconciliationPeriodTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateContractInput], { nullable: true }) 
  contracts?: UserCreateContractInput[]


}
