import { Field, ObjectType } from '@nestjs/graphql'

import { Lead } from '@case-clinical/api/lead/data-access'

import { Treatment } from '@case-clinical/api/treatment/data-access'


@ObjectType()
export class LeadTreatment {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  treatmentId?: string


  @Field(() => Lead, { nullable: true }) 
  lead?: Lead  

  @Field(() => Treatment, { nullable: true }) 
  treatment?: Treatment  

}
