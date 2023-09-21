import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 


@InputType()
export class UserUpdateReferralRequestInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => UserUpdatePatientInput ,{ nullable: true }) 
  patient?: UserUpdatePatientInput  


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserUpdateLegalCaseInput  


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  requestingProvider?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateClinicalProviderLocationInput ,{ nullable: true }) 
  referredToLocation?: UserUpdateClinicalProviderLocationInput  

}