import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContractedRateInput } from './user-update-contracted-rate.input'

@InputType()
export class UserUpdateContractedRatesInput {
  @Field(() => [UserUpdateContractedRateInput], {nullable: true }) 
  contractedRates: UserUpdateContractedRateInput[]
}
