import { Field, ObjectType } from '@nestjs/graphql'

import { Lead } from '@case-clinical/api/lead/data-access'


@ObjectType()
export class LeadAction {

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


  @Field(() => Lead, { nullable: true }) 
  lead?: Lead  

}
