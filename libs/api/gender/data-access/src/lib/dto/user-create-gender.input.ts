import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 


@InputType()
export class UserCreateGenderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [UserCreatePatientInput], { nullable: true }) 
  patients?: UserCreatePatientInput[]


}
