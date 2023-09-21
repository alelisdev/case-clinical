import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 


@InputType()
export class AdminUpdateContractKindInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateContractedRateInput], { nullable: true }) 
  contractedRates?: UserUpdateContractedRateInput[]


}