import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class AdminCreateCalculationBasisTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateContractInput], { nullable: true }) 
  contracts?: AdminCreateContractInput[]


}