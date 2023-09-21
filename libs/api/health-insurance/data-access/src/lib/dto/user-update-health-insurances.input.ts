import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateHealthInsuranceInput } from './user-update-health-insurance.input'

@InputType()
export class UserUpdateHealthInsurancesInput {
  @Field(() => [UserUpdateHealthInsuranceInput], {nullable: true }) 
  healthInsurances: UserUpdateHealthInsuranceInput[]
}
