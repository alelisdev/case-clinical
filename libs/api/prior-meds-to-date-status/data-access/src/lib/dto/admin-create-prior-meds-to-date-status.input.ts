import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorMedsToDateInput } from '@case-clinical/api/prior-meds-to-date/data-access' 


@InputType()
export class AdminCreatePriorMedsToDateStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreatePriorMedsToDateInput], { nullable: true }) 
  priorMedsToDates?: AdminCreatePriorMedsToDateInput[]


}