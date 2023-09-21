import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorMedsToDateInput } from '@case-clinical/api/prior-meds-to-date/data-access' 


@InputType()
export class AdminUpdatePriorMedsToDateStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdatePriorMedsToDateInput], { nullable: true }) 
  priorMedsToDates?: UserUpdatePriorMedsToDateInput[]


}