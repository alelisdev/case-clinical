import { Field, ObjectType } from '@nestjs/graphql'

import { Insurance } from '@case-clinical/api/insurance/data-access' 


@ObjectType()
export class InsuranceSector {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Insurance], { nullable: true }) 
  insurances?: Insurance[]


}
