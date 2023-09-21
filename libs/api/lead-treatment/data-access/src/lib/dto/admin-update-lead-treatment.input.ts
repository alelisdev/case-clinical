import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLeadInput } from '@case-clinical/api/lead/data-access' 
import { AdminUpdateTreatmentInput } from '@case-clinical/api/treatment/data-access' 


@InputType()
export class AdminUpdateLeadTreatmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  treatmentId?: string


  @Field(() => AdminUpdateLeadInput ,{ nullable: true }) 
  lead?: AdminUpdateLeadInput  


  @Field(() => AdminUpdateTreatmentInput ,{ nullable: true }) 
  treatment?: AdminUpdateTreatmentInput  

}