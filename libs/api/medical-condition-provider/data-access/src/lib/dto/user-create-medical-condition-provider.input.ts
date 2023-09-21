import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class UserCreateMedicalConditionProviderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  medicalConditionId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field(() => [UserCreateDocumentInput], { nullable: true }) 
  medicalRecords?: UserCreateDocumentInput[]


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  

}
