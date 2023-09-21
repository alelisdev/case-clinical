import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class UserCreatePrescriptionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  medicalProvider?: string

  @Field({ nullable: true }) 
  dateWritten?: Date

  @Field({ nullable: true }) 
  days?: string

  @Field({ nullable: true }) 
  note?: string

  @Field({ nullable: true }) 
  category?: string

  @Field({ nullable: true }) 
  kind?: string

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  refills?: string

  @Field({ nullable: true }) 
  rxNumber?: string

  @Field({ nullable: true }) 
  sig?: string

  @Field({ nullable: true }) 
  strength?: string

  @Field({ nullable: true }) 
  unit?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  documentId?: string


  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  document?: UserCreateDocumentInput  

}
