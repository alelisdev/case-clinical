import { Field, ObjectType } from '@nestjs/graphql'

import { ContractedRate } from '@case-clinical/api/contracted-rate/data-access' 


@ObjectType()
export class ContractKind {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [ContractedRate], { nullable: true }) 
  contractedRates?: ContractedRate[]


}
