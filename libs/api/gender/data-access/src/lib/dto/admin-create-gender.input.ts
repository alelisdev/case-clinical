import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 


@InputType()
export class AdminCreateGenderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [AdminCreatePatientInput], { nullable: true }) 
  patients?: AdminCreatePatientInput[]


}