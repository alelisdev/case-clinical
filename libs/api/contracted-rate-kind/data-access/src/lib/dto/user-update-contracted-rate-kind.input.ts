import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 


@InputType()
export class UserUpdateContractedRateKindInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [UserUpdateContractedRateInput], { nullable: true }) 
  contractedRates?: UserUpdateContractedRateInput[]


}