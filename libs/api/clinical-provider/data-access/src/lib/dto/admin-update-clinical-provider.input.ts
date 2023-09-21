import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserUpdateClinicalProviderTagInput } from '@case-clinical/api/clinical-provider-tag/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserUpdateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 
import { UserUpdateClinicalProviderSpecialtyInput } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { UserUpdateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 
import { UserUpdateClinicalProviderServiceInput } from '@case-clinical/api/clinical-provider-service/data-access' 
import { UserUpdatePchProviderInput } from '@case-clinical/api/pch-provider/data-access' 
import { UserUpdateFavoriteProviderInput } from '@case-clinical/api/favorite-provider/data-access' 
import { UserUpdateMedicalRecordInput } from '@case-clinical/api/medical-record/data-access' 
import { UserUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access' 
import { UserUpdateMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access' 
import { UserUpdateReviewInput } from '@case-clinical/api/review/data-access' 
import { UserUpdateEducationInput } from '@case-clinical/api/education/data-access' 
import { UserUpdateAwardInput } from '@case-clinical/api/award/data-access' 
import { UserUpdateExperienceInput } from '@case-clinical/api/experience/data-access' 
import { UserUpdateReferralRequestInput } from '@case-clinical/api/referral-request/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateClinicalProviderInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateClinicalProviderTagInput], { nullable: true }) 
  clinicalProviderTags?: UserUpdateClinicalProviderTagInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  treatingClinicalProviders?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  referredToClinicalProviders?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdateClinicalProviderLocationInput], { nullable: true }) 
  clinicalProviderLocations?: UserUpdateClinicalProviderLocationInput[]

  @Field(() => [UserUpdateClinicalProviderSpecialtyInput], { nullable: true }) 
  clinicalProviderSpecialties?: UserUpdateClinicalProviderSpecialtyInput[]

  @Field(() => [UserUpdateContractedRateInput], { nullable: true }) 
  contractedRates?: UserUpdateContractedRateInput[]

  @Field(() => [UserUpdateClinicalProviderServiceInput], { nullable: true }) 
  services?: UserUpdateClinicalProviderServiceInput[]

  @Field(() => [UserUpdatePchProviderInput], { nullable: true }) 
  pchProviders?: UserUpdatePchProviderInput[]

  @Field(() => [UserUpdateFavoriteProviderInput], { nullable: true }) 
  favoriteProviders?: UserUpdateFavoriteProviderInput[]

  @Field(() => [UserUpdateMedicalRecordInput], { nullable: true }) 
  medicalRecords?: UserUpdateMedicalRecordInput[]

  @Field(() => [UserUpdateAppointmentInput], { nullable: true }) 
  appointments?: UserUpdateAppointmentInput[]

  @Field(() => [UserUpdateMedicalConditionProviderInput], { nullable: true }) 
  medicalConditionProviders?: UserUpdateMedicalConditionProviderInput[]

  @Field(() => [UserUpdateReviewInput], { nullable: true }) 
  reviews?: UserUpdateReviewInput[]

  @Field(() => [UserUpdateEducationInput], { nullable: true }) 
  educations?: UserUpdateEducationInput[]

  @Field(() => [UserUpdateAwardInput], { nullable: true }) 
  awards?: UserUpdateAwardInput[]

  @Field(() => [UserUpdateExperienceInput], { nullable: true }) 
  experiences?: UserUpdateExperienceInput[]

  @Field(() => [UserUpdateReferralRequestInput], { nullable: true }) 
  referralRequests?: UserUpdateReferralRequestInput[]

  @Field(() => [UserUpdateReferralRequestInput], { nullable: true }) 
  referralRequestFromRequestingProviders?: UserUpdateReferralRequestInput[]

  @Field(() => UserUpdateUserInput, { nullable: true }) 
  user?: UserUpdateUserInput


  @Field(() => AdminUpdateVendorInput ,{ nullable: true }) 
  vendor?: AdminUpdateVendorInput  

}