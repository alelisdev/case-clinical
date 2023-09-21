import { Field, ObjectType } from '@nestjs/graphql'

import { Document } from '@case-clinical/api/document/data-access'
import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { Patient } from '@case-clinical/api/patient/data-access'


@ObjectType()
export class MedicalRecord {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string


  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider  
  
  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

  
  @Field(() => Document, { nullable: true })
  document?: Document

  @Field({ nullable: true }) 
  description?: string

}
