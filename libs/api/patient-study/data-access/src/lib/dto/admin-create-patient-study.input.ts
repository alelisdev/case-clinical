import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class AdminCreatePatientStudyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field(() => [AdminCreateDocumentInput], { nullable: true }) 
  documents?: AdminCreateDocumentInput[]


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  

}