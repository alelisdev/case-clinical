import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLeadInput } from '@case-clinical/api/lead/data-access' 
import { UserUpdateTreatmentInput } from '@case-clinical/api/treatment/data-access' 


@InputType()
export class UserUpdateLeadTreatmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  treatmentId?: string


  @Field(() => UserUpdateLeadInput ,{ nullable: true }) 
  lead?: UserUpdateLeadInput  


  @Field(() => UserUpdateTreatmentInput ,{ nullable: true }) 
  treatment?: UserUpdateTreatmentInput  

}