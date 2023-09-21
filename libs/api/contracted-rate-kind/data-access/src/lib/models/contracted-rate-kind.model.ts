import { Field, ObjectType } from '@nestjs/graphql'

import { ContractedRate } from '@case-clinical/api/contracted-rate/data-access' 


@ObjectType()
export class ContractedRateKind {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [ContractedRate], { nullable: true }) 
  contractedRates?: ContractedRate[]


}
