import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class UserCreatePatientStudyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field(() => [UserCreateDocumentInput], { nullable: true }) 
  documents?: UserCreateDocumentInput[]


  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  

}
