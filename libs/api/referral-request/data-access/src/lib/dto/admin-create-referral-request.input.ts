import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 


@InputType()
export class AdminCreateReferralRequestInput {

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


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  requestingProvider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateClinicalProviderLocationInput ,{ nullable: true }) 
  referredToLocation?: AdminCreateClinicalProviderLocationInput  

}