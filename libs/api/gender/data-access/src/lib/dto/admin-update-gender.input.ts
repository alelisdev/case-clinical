import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 


@InputType()
export class AdminUpdateGenderInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [UserUpdatePatientInput], { nullable: true }) 
  patients?: UserUpdatePatientInput[]


}