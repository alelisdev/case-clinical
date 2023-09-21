import { Field, ObjectType } from '@nestjs/graphql'

import { Lead } from '@case-clinical/api/lead/data-access' 


@ObjectType()
export class LeadSource {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Lead], { nullable: true }) 
  leads?: Lead[]


}
