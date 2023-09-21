import { Field, ObjectType } from '@nestjs/graphql'

import { LeadInjury } from '@case-clinical/api/lead-injury/data-access' 


@ObjectType()
export class Injury {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [LeadInjury], { nullable: true }) 
  leads?: LeadInjury[]


}
