import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminCreateClinicalProviderTagInput } from '@case-clinical/api/clinical-provider-tag/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { AdminCreateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 
import { AdminCreateClinicalProviderSpecialtyInput } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { AdminCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 
import { AdminCreateClinicalProviderServiceInput } from '@case-clinical/api/clinical-provider-service/data-access' 
import { AdminCreatePchProviderInput } from '@case-clinical/api/pch-provider/data-access' 
import { AdminCreateFavoriteProviderInput } from '@case-clinical/api/favorite-provider/data-access' 
import { AdminCreateMedicalRecordInput } from '@case-clinical/api/medical-record/data-access' 
import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 
import { AdminCreateMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access' 
import { AdminCreateReviewInput } from '@case-clinical/api/review/data-access' 
import { AdminCreateEducationInput } from '@case-clinical/api/education/data-access' 
import { AdminCreateAwardInput } from '@case-clinical/api/award/data-access' 
import { AdminCreateExperienceInput } from '@case-clinical/api/experience/data-access' 
import { AdminCreateReferralRequestInput } from '@case-clinical/api/referral-request/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateClinicalProviderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  expertId?: string

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

  @Field(() => [AdminCreateClinicalProviderTagInput], { nullable: true }) 
  clinicalProviderTags?: AdminCreateClinicalProviderTagInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  treatingClinicalProviders?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  referredToClinicalProviders?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreateClinicalProviderLocationInput], { nullable: true }) 
  clinicalProviderLocations?: AdminCreateClinicalProviderLocationInput[]

  @Field(() => [AdminCreateClinicalProviderSpecialtyInput], { nullable: true }) 
  clinicalProviderSpecialties?: AdminCreateClinicalProviderSpecialtyInput[]

  @Field(() => [AdminCreateContractedRateInput], { nullable: true }) 
  contractedRates?: AdminCreateContractedRateInput[]

  @Field(() => [AdminCreateClinicalProviderServiceInput], { nullable: true }) 
  services?: AdminCreateClinicalProviderServiceInput[]

  @Field(() => [AdminCreatePchProviderInput], { nullable: true }) 
  pchProviders?: AdminCreatePchProviderInput[]

  @Field(() => [AdminCreateFavoriteProviderInput], { nullable: true }) 
  favoriteProviders?: AdminCreateFavoriteProviderInput[]

  @Field(() => [AdminCreateMedicalRecordInput], { nullable: true }) 
  medicalRecords?: AdminCreateMedicalRecordInput[]

  @Field(() => [AdminCreateAppointmentInput], { nullable: true }) 
  appointments?: AdminCreateAppointmentInput[]

  @Field(() => [AdminCreateMedicalConditionProviderInput], { nullable: true }) 
  medicalConditionProviders?: AdminCreateMedicalConditionProviderInput[]

  @Field(() => [AdminCreateReviewInput], { nullable: true }) 
  reviews?: AdminCreateReviewInput[]

  @Field(() => [AdminCreateEducationInput], { nullable: true }) 
  educations?: AdminCreateEducationInput[]

  @Field(() => [AdminCreateAwardInput], { nullable: true }) 
  awards?: AdminCreateAwardInput[]

  @Field(() => [AdminCreateExperienceInput], { nullable: true }) 
  experiences?: AdminCreateExperienceInput[]

  @Field(() => [AdminCreateReferralRequestInput], { nullable: true }) 
  referralRequests?: AdminCreateReferralRequestInput[]

  @Field(() => [AdminCreateReferralRequestInput], { nullable: true }) 
  referralRequestFromRequestingProviders?: AdminCreateReferralRequestInput[]

  @Field(() => AdminCreateUserInput, { nullable: true }) 
  user?: AdminCreateUserInput


  @Field(() => AdminCreateVendorInput ,{ nullable: true }) 
  vendor?: AdminCreateVendorInput  

}