import { Field, ObjectType } from '@nestjs/graphql'

import { Patient } from '@case-clinical/api/patient/data-access'
import { Document } from '@case-clinical/api/document/data-access' 


@ObjectType()
export class PatientStudy {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field(() => [Document], { nullable: true }) 
  documents?: Document[]


  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

}
