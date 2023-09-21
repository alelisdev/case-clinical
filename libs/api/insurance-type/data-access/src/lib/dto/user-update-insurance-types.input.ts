import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateInsuranceTypeInput } from './user-update-insurance-type.input'

@InputType()
export class UserUpdateInsuranceTypesInput {
  @Field(() => [UserUpdateInsuranceTypeInput], {nullable: true }) 
  insuranceTypes: UserUpdateInsuranceTypeInput[]
}
