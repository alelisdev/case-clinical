import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateEthnicityInput } from '@case-clinical/api/ethnicity/data-access' 
import { AdminUpdateGenderInput } from '@case-clinical/api/gender/data-access' 
import { AdminUpdateLanguageInput } from '@case-clinical/api/language/data-access' 
import { UserUpdatePrescriptionInput } from '@case-clinical/api/prescription/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdatePatientStudyInput } from '@case-clinical/api/patient-study/data-access' 
import { UserUpdateClaimInput } from '@case-clinical/api/claim/data-access' 
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdatePatientInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  middleName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  suffix?: string

  @Field({ nullable: true }) 
  genderId?: string

  @Field({ nullable: true }) 
  nickname?: string

  @Field({ nullable: true }) 
  height?: string

  @Field({ nullable: true }) 
  weight?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  primaryPhoneNumber?: string

  @Field({ nullable: true }) 
  isPrimaryPhoneMobile?: boolean

  @Field({ nullable: true }) 
  secondaryPhoneNumber?: string

  @Field({ nullable: true }) 
  isSecondaryPhoneMobile?: boolean

  @Field({ nullable: true }) 
  memberRegistrationNumber?: string

  @Field({ nullable: true }) 
  ethnicityId?: string

  @Field({ nullable: true }) 
  languageId?: string

  @Field({ nullable: true }) 
  requiresTranslator?: boolean

  @Field({ nullable: true }) 
  socialSecurityNumber?: string

  @Field({ nullable: true }) 
  honorific?: string

  @Field({ nullable: true }) 
  primaryEmailAddress?: string

  @Field({ nullable: true }) 
  primaryAddressLine1?: string

  @Field({ nullable: true }) 
  primaryAddressLine2?: string

  @Field({ nullable: true }) 
  primaryAddressCity?: string

  @Field({ nullable: true }) 
  primaryAddressStateOrProvince?: string

  @Field({ nullable: true }) 
  primaryAddressPostalCode?: string

  @Field({ nullable: true }) 
  workAddressLine1?: string

  @Field({ nullable: true }) 
  workAddressLine2?: string

  @Field({ nullable: true }) 
  workAddressCity?: string

  @Field({ nullable: true }) 
  workAddressStateOrProvince?: string

  @Field({ nullable: true }) 
  workAddressPostalCode?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  latitude?: number

  @Field({ nullable: true }) 
  longitude?: number

  @Field({ nullable: true }) 
  workLatitude?: number

  @Field({ nullable: true }) 
  workLongitude?: number

  @Field({ nullable: true }) 
  emergencyContactId?: string

  @Field({ nullable: true }) 
  homePhoneNumber?: string

  @Field({ nullable: true }) 
  mobileNumber?: string

  @Field({ nullable: true }) 
  bmi?: string

  @Field({ nullable: true }) 
  occupation?: string

  @Field({ nullable: true }) 
  debtorRemarks?: string

  @Field(() => [UserUpdatePrescriptionInput], { nullable: true }) 
  prescriptions?: UserUpdatePrescriptionInput[]

  @Field(() => [UserUpdateDocumentInput], { nullable: true }) 
  documents?: UserUpdateDocumentInput[]

  @Field(() => [UserUpdatePatientStudyInput], { nullable: true }) 
  patientStudies?: UserUpdatePatientStudyInput[]

  @Field(() => [UserUpdateClaimInput], { nullable: true }) 
  claims?: UserUpdateClaimInput[]

  @Field(() => [UserUpdateLegalCaseInput], { nullable: true }) 
  legalCases?: UserUpdateLegalCaseInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdateAppointmentInput], { nullable: true }) 
  appointments?: UserUpdateAppointmentInput[]

  @Field(() => [UserUpdateUserInput], { nullable: true }) 
  users?: UserUpdateUserInput[]


  @Field(() => AdminUpdateEthnicityInput ,{ nullable: true }) 
  ethnicity?: AdminUpdateEthnicityInput  


  @Field(() => AdminUpdateGenderInput ,{ nullable: true }) 
  gender?: AdminUpdateGenderInput  


  @Field(() => AdminUpdateLanguageInput ,{ nullable: true }) 
  language?: AdminUpdateLanguageInput  

}