import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePriorMedsToDateInput } from '@case-clinical/api/prior-meds-to-date/data-access' 


@InputType()
export class UserCreatePriorMedsToDateStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreatePriorMedsToDateInput], { nullable: true }) 
  priorMedsToDates?: UserCreatePriorMedsToDateInput[]


}
