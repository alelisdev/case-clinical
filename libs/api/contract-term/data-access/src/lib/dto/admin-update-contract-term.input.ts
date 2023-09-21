import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class AdminUpdateContractTermInput {

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


  @Field(() => AdminUpdateContractInput ,{ nullable: true }) 
  contract?: AdminUpdateContractInput  

}