import { Field, ObjectType } from '@nestjs/graphql'

import { BodyPartLead } from '@case-clinical/api/body-part-lead/data-access' 


@ObjectType()
export class BodyPart {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [BodyPartLead], { nullable: true }) 
  leads?: BodyPartLead[]


}
