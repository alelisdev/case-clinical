import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminUpdateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 


@InputType()
export class AdminUpdateReferralRequestInput {

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


  @Field(() => AdminUpdatePatientInput ,{ nullable: true }) 
  patient?: AdminUpdatePatientInput  


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  requestingProvider?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateClinicalProviderLocationInput ,{ nullable: true }) 
  referredToLocation?: AdminUpdateClinicalProviderLocationInput  

}