import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class UserUpdatePatientStudyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field(() => [UserUpdateDocumentInput], { nullable: true }) 
  documents?: UserUpdateDocumentInput[]


  @Field(() => UserUpdatePatientInput ,{ nullable: true }) 
  patient?: UserUpdatePatientInput  

}