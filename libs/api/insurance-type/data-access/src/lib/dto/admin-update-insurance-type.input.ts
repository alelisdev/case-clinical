import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateInsuranceInput } from '@case-clinical/api/insurance/data-access' 


@InputType()
export class AdminUpdateInsuranceTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateInsuranceInput], { nullable: true }) 
  insurances?: UserUpdateInsuranceInput[]


}