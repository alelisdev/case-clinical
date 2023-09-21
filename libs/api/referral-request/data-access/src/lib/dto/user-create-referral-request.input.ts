import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 


@InputType()
export class UserCreateReferralRequestInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  requestingProviderId?: string

  @Field({ nullable: true }) 
  referredToId?: string

  @Field({ nullable: true }) 
  clinicalProviderLocationId?: string

  @Field({ nullable: true }) 
  status?: string


  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  requestingProvider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateClinicalProviderLocationInput ,{ nullable: true }) 
  referredToLocation?: UserCreateClinicalProviderLocationInput  

}
