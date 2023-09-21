import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { Document } from '@case-clinical/api/document/data-access' 


@ObjectType()
export class MedicalConditionProvider {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  medicalConditionId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field(() => [Document], { nullable: true }) 
  medicalRecords?: Document[]


  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider  

}
