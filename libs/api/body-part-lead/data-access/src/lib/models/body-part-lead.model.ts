import { Field, ObjectType } from '@nestjs/graphql'

import { Lead } from '@case-clinical/api/lead/data-access'

import { BodyPart } from '@case-clinical/api/body-part/data-access'


@ObjectType()
export class BodyPartLead {

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


  @Field(() => Lead, { nullable: true }) 
  lead?: Lead  

  @Field(() => BodyPart, { nullable: true }) 
  bodyPart?: BodyPart  

}
