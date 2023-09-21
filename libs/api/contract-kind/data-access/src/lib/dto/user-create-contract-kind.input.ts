import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 


@InputType()
export class UserCreateContractKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateContractedRateInput], { nullable: true }) 
  contractedRates?: UserCreateContractedRateInput[]


}
