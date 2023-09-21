import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class UserUpdateContractTermInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => UserUpdateContractInput ,{ nullable: true }) 
  contract?: UserUpdateContractInput  

}