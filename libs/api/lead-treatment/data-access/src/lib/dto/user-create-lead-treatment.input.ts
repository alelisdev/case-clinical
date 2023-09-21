import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLeadInput } from '@case-clinical/api/lead/data-access' 
import { UserCreateTreatmentInput } from '@case-clinical/api/treatment/data-access' 


@InputType()
export class UserCreateLeadTreatmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  treatmentId?: string


  @Field(() => UserCreateLeadInput ,{ nullable: true }) 
  lead?: UserCreateLeadInput  


  @Field(() => UserCreateTreatmentInput ,{ nullable: true }) 
  treatment?: UserCreateTreatmentInput  

}
