import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateInsuranceInput } from '@case-clinical/api/insurance/data-access' 


@InputType()
export class AdminCreateInsuranceSectorInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateInsuranceInput], { nullable: true }) 
  insurances?: AdminCreateInsuranceInput[]


}