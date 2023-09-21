import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateInsuranceInput } from './user-update-insurance.input'

@InputType()
export class UserUpdateInsurancesInput {
  @Field(() => [UserUpdateInsuranceInput], {nullable: true }) 
  insurances: UserUpdateInsuranceInput[]
}
