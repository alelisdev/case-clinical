import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 


@InputType()
export class AdminCreateContractKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateContractedRateInput], { nullable: true }) 
  contractedRates?: AdminCreateContractedRateInput[]


}