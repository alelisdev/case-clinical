import { Field, InputType } from '@nestjs/graphql'

import { UserCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserCreateClinicalProviderTagInput } from '@case-clinical/api/clinical-provider-tag/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserCreateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 
import { UserCreateClinicalProviderSpecialtyInput } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { UserCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 
import { UserCreateClinicalProviderServiceInput } from '@case-clinical/api/clinical-provider-service/data-access' 
import { UserCreatePchProviderInput } from '@case-clinical/api/pch-provider/data-access' 
import { UserCreateFavoriteProviderInput } from '@case-clinical/api/favorite-provider/data-access' 
import { UserCreateMedicalRecordInput } from '@case-clinical/api/medical-record/data-access' 
import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 
import { UserCreateMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access' 
import { UserCreateReviewInput } from '@case-clinical/api/review/data-access' 
import { UserCreateEducationInput } from '@case-clinical/api/education/data-access' 
import { UserCreateAwardInput } from '@case-clinical/api/award/data-access' 
import { UserCreateExperienceInput } from '@case-clinical/api/experience/data-access' 
import { UserCreateReferralRequestInput } from '@case-clinical/api/referral-request/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'
import { UserCreateLocationInput } from '@case-clinical/api/location/data-access'


@InputType()
export class UserCreateClinicalProviderInput {

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
  @Field(() => [UserCreateLocationInput], { nullable: true })
  locations?: UserCreateLocationInput[]

  @Field(() => [UserCreateClinicalProviderTagInput], { nullable: true }) 
  clinicalProviderTags?: UserCreateClinicalProviderTagInput[]

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  treatingClinicalProviders?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  referredToClinicalProviders?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreateClinicalProviderLocationInput], { nullable: true }) 
  clinicalProviderLocations?: UserCreateClinicalProviderLocationInput[]

  @Field(() => [UserCreateClinicalProviderSpecialtyInput], { nullable: true }) 
  clinicalProviderSpecialties?: UserCreateClinicalProviderSpecialtyInput[]

  @Field(() => [UserCreateContractedRateInput], { nullable: true }) 
  contractedRates?: UserCreateContractedRateInput[]

  @Field(() => [UserCreateClinicalProviderServiceInput], { nullable: true }) 
  services?: UserCreateClinicalProviderServiceInput[]

  @Field(() => [UserCreatePchProviderInput], { nullable: true }) 
  pchProviders?: UserCreatePchProviderInput[]

  @Field(() => [UserCreateFavoriteProviderInput], { nullable: true }) 
  favoriteProviders?: UserCreateFavoriteProviderInput[]

  @Field(() => [UserCreateMedicalRecordInput], { nullable: true }) 
  medicalRecords?: UserCreateMedicalRecordInput[]

  @Field(() => [UserCreateAppointmentInput], { nullable: true }) 
  appointments?: UserCreateAppointmentInput[]

  @Field(() => [UserCreateMedicalConditionProviderInput], { nullable: true }) 
  medicalConditionProviders?: UserCreateMedicalConditionProviderInput[]

  @Field(() => [UserCreateReviewInput], { nullable: true }) 
  reviews?: UserCreateReviewInput[]

  @Field(() => [UserCreateEducationInput], { nullable: true }) 
  educations?: UserCreateEducationInput[]

  @Field(() => [UserCreateAwardInput], { nullable: true }) 
  awards?: UserCreateAwardInput[]

  @Field(() => [UserCreateExperienceInput], { nullable: true }) 
  experiences?: UserCreateExperienceInput[]

  @Field(() => [UserCreateReferralRequestInput], { nullable: true }) 
  referralRequests?: UserCreateReferralRequestInput[]

  @Field(() => [UserCreateReferralRequestInput], { nullable: true }) 
  referralRequestFromRequestingProviders?: UserCreateReferralRequestInput[]

  @Field(() => UserCreateUserInput, { nullable: true }) 
  user?: UserCreateUserInput


  @Field(() => UserCreateVendorInput ,{ nullable: true }) 
  vendor?: UserCreateVendorInput  

  @Field(() => UserCreateDocumentInput ,{ nullable: true })
  profileImage?: UserCreateDocumentInput
}
