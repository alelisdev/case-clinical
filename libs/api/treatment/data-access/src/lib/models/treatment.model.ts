import { Field, ObjectType } from '@nestjs/graphql'

import { LeadTreatment } from '@case-clinical/api/lead-treatment/data-access' 


@ObjectType()
export class Treatment {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [LeadTreatment], { nullable: true }) 
  leads?: LeadTreatment[]


}
