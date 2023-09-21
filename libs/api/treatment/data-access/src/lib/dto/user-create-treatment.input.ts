import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLeadTreatmentInput } from '@case-clinical/api/lead-treatment/data-access' 


@InputType()
export class UserCreateTreatmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateLeadTreatmentInput], { nullable: true }) 
  leads?: UserCreateLeadTreatmentInput[]


}
