import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLeadInput } from '@case-clinical/api/lead/data-access' 
import { AdminCreateTreatmentInput } from '@case-clinical/api/treatment/data-access' 


@InputType()
export class AdminCreateLeadTreatmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  treatmentId?: string


  @Field(() => AdminCreateLeadInput ,{ nullable: true }) 
  lead?: AdminCreateLeadInput  


  @Field(() => AdminCreateTreatmentInput ,{ nullable: true }) 
  treatment?: AdminCreateTreatmentInput  

}