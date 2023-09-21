import { Field, ObjectType } from '@nestjs/graphql'

import { Vendor } from '@case-clinical/api/vendor/data-access'
import { ClinicalProviderTag } from '@case-clinical/api/clinical-provider-tag/data-access' 
import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access' 
import { ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access' 
import { ClinicalProviderSpecialty } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { ContractedRate } from '@case-clinical/api/contracted-rate/data-access' 
import { ClinicalProviderService } from '@case-clinical/api/clinical-provider-service/data-access' 
import { PchProvider } from '@case-clinical/api/pch-provider/data-access' 
import { FavoriteProvider } from '@case-clinical/api/favorite-provider/data-access' 
import { MedicalRecord } from '@case-clinical/api/medical-record/data-access' 
import { Appointment } from '@case-clinical/api/appointment/data-access' 
import { MedicalConditionProvider } from '@case-clinical/api/medical-condition-provider/data-access' 
import { User } from '@case-clinical/api/user/data-access'
import { Document } from '@case-clinical/api/document/data-access'
import { Education } from '@case-clinical/api/education/data-access'
import { Experience } from '@case-clinical/api/experience/data-access'
import { Award } from '@case-clinical/api/award/data-access'
import { Review } from '@case-clinical/api/review/data-access'
import { Service } from '@case-clinical/api/service/data-access'
import { ReferralRequest } from '@case-clinical/api/referral-request/data-access'


@ObjectType()
export class ClinicalProvider {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  expertId?: string

  @Field({ nullable: true }) 
  bio?: string

  @Field({ nullable: true }) 
  npi?: string

  @Field({ nullable: true }) 
  stateLicenseNumber?: string

  @Field({ nullable: true }) 
  caqhNumber?: string

  @Field({ nullable: true }) 
  honorific?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  suffix?: string

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  emailAddress?: string

  @Field({ nullable: true }) 
  profilePictureId?: string

  @Field({ nullable: true }) 
  compressProfilePictureId?: string

  @Field({ nullable: true })
  hourlyRate?: number

  @Field({ nullable: true })
  rating?: number
  
  @Field({ nullable: true })
  reviewCount?: number


  @Field(() => [ClinicalProviderTag], { nullable: true }) 
  clinicalProviderTags?: ClinicalProviderTag[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  treatingClinicalProviders?: PriorAuthorizationRequest[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  referredToClinicalProviders?: PriorAuthorizationRequest[]

  @Field(() => [ClinicalProviderLocation], { nullable: true }) 
  clinicalProviderLocations?: ClinicalProviderLocation[]

  @Field(() => [ClinicalProviderSpecialty], { nullable: true }) 
  clinicalProviderSpecialties?: ClinicalProviderSpecialty[]

  @Field(() => [ContractedRate], { nullable: true }) 
  contractedRates?: ContractedRate[]

  @Field(() => [ClinicalProviderService], { nullable: true }) 
  services?: ClinicalProviderService[]

  @Field(() => [PchProvider], { nullable: true }) 
  pchProviders?: PchProvider[]

  @Field(() => [FavoriteProvider], { nullable: true }) 
  favoriteProviders?: FavoriteProvider[]

  @Field(() => [MedicalRecord], { nullable: true }) 
  medicalRecords?: MedicalRecord[]

  @Field(() => [Appointment], { nullable: true }) 
  appointments?: Appointment[]

  @Field(() => [MedicalConditionProvider], { nullable: true }) 
  medicalConditionProviders?: MedicalConditionProvider[]

  @Field(() => [Review], { nullable: true }) 
  reviews?: Review[]

  @Field(() => [Education], { nullable: true }) 
  educations?: Education[]

  @Field(() => [Award], { nullable: true }) 
  awards?: Award[]

  @Field(() => [Experience], { nullable: true }) 
  experiences?: Experience[]

  @Field(() => [ReferralRequest], { nullable: true }) 
  referralRequests?: ReferralRequest[]

  @Field(() => [ReferralRequest], { nullable: true }) 
  referralRequestFromRequestingProviders?: ReferralRequest[]

  @Field(() => User, { nullable: true }) 
  user?: User


  @Field(() => Vendor, { nullable: true }) 
  vendor?: Vendor  
  
  @Field(() => Document, { nullable: true })
  profileImage?: Document

}
