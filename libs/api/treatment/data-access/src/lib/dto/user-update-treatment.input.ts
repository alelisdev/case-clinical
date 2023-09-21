import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLeadTreatmentInput } from '@case-clinical/api/lead-treatment/data-access' 


@InputType()
export class UserUpdateTreatmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateLeadTreatmentInput], { nullable: true }) 
  leads?: UserUpdateLeadTreatmentInput[]


}