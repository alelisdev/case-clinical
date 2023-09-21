import { Field, ObjectType } from '@nestjs/graphql'

import { Contract } from '@case-clinical/api/contract/data-access'


@ObjectType()
export class ContractTerm {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => Contract, { nullable: true }) 
  contract?: Contract  

}
