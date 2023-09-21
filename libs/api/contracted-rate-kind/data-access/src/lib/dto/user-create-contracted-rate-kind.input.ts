import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 


@InputType()
export class UserCreateContractedRateKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [UserCreateContractedRateInput], { nullable: true }) 
  contractedRates?: UserCreateContractedRateInput[]


}
