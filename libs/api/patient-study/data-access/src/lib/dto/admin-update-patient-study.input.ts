import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class AdminUpdatePatientStudyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field(() => [UserUpdateDocumentInput], { nullable: true }) 
  documents?: UserUpdateDocumentInput[]


  @Field(() => AdminUpdatePatientInput ,{ nullable: true }) 
  patient?: AdminUpdatePatientInput  

}