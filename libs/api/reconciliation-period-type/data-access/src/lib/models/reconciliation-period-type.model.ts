import { Field, ObjectType } from '@nestjs/graphql'

import { Contract } from '@case-clinical/api/contract/data-access' 


@ObjectType()
export class ReconciliationPeriodType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Contract], { nullable: true }) 
  contracts?: Contract[]


}
