import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 


@InputType()
export class UserUpdateEthnicityInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdatePatientInput], { nullable: true }) 
  patients?: UserUpdatePatientInput[]


}