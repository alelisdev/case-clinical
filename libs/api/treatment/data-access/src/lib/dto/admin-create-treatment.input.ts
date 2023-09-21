import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLeadTreatmentInput } from '@case-clinical/api/lead-treatment/data-access' 


@InputType()
export class AdminCreateTreatmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateLeadTreatmentInput], { nullable: true }) 
  leads?: AdminCreateLeadTreatmentInput[]


}