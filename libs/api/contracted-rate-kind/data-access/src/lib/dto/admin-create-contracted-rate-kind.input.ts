import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 


@InputType()
export class AdminCreateContractedRateKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [AdminCreateContractedRateInput], { nullable: true }) 
  contractedRates?: AdminCreateContractedRateInput[]


}