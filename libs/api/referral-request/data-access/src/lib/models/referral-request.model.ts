import { Field, ObjectType } from '@nestjs/graphql'

import { Patient } from '@case-clinical/api/patient/data-access'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'


@ObjectType()
export class ReferralRequest {

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


  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

  @Field(() => ClinicalProvider, { nullable: true }) 
  requestingProvider?: ClinicalProvider  

  @Field(() => ClinicalProvider, { nullable: true }) 
  referredTo?: ClinicalProvider  

  @Field(() => ClinicalProviderLocation, { nullable: true }) 
  referredToLocation?: ClinicalProviderLocation  

}
