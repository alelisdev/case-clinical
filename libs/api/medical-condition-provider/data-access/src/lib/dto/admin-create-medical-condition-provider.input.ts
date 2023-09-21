import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class AdminCreateMedicalConditionProviderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  medicalConditionId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field(() => [AdminCreateDocumentInput], { nullable: true }) 
  medicalRecords?: AdminCreateDocumentInput[]


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  

}