import { Field, ObjectType } from '@nestjs/graphql'

import { Lead } from '@case-clinical/api/lead/data-access'

import { Severity } from '@case-clinical/api/severity/data-access'
import { Injury } from '@case-clinical/api/injury/data-access' 


@ObjectType()
export class LeadInjury {

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
  bodyPartId?: string

  @Field({ nullable: true }) 
  severityId?: string

  @Field(() => [Injury], { nullable: true }) 
  injuries?: Injury[]


  @Field(() => Lead, { nullable: true }) 
  lead?: Lead  

  @Field(() => Severity, { nullable: true }) 
  severity?: Severity  

}
