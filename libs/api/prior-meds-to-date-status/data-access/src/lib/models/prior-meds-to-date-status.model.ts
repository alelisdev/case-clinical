import { Field, ObjectType } from '@nestjs/graphql'

import { PriorMedsToDate } from '@case-clinical/api/prior-meds-to-date/data-access' 


@ObjectType()
export class PriorMedsToDateStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [PriorMedsToDate], { nullable: true }) 
  priorMedsToDates?: PriorMedsToDate[]


}
