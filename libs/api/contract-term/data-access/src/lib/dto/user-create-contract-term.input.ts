import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class UserCreateContractTermInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  maxApproved?: number

  @Field({ nullable: true }) 
  numberIncluded?: number

  @Field({ nullable: true }) 
  factor?: number

  @Field({ nullable: true }) 
  contractTermId?: string


  @Field(() => UserCreateContractInput ,{ nullable: true }) 
  contract?: UserCreateContractInput  

}
