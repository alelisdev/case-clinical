import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class UserUpdateMedicalConditionProviderInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  medicalConditionId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field(() => [UserUpdateDocumentInput], { nullable: true }) 
  medicalRecords?: UserUpdateDocumentInput[]


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  

}