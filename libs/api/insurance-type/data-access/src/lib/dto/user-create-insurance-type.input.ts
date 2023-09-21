import { Field, InputType } from '@nestjs/graphql'

import { UserCreateInsuranceInput } from '@case-clinical/api/insurance/data-access' 


@InputType()
export class UserCreateInsuranceTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateInsuranceInput], { nullable: true }) 
  insurances?: UserCreateInsuranceInput[]


}
