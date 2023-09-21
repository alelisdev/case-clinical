import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateEthnicityInput } from '@case-clinical/api/ethnicity/data-access' 
import { AdminCreateGenderInput } from '@case-clinical/api/gender/data-access' 
import { AdminCreateLanguageInput } from '@case-clinical/api/language/data-access' 
import { AdminCreatePrescriptionInput } from '@case-clinical/api/prescription/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreatePatientStudyInput } from '@case-clinical/api/patient-study/data-access' 
import { AdminCreateClaimInput } from '@case-clinical/api/claim/data-access' 
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreatePatientInput {

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

  @Field(() => [AdminCreatePrescriptionInput], { nullable: true }) 
  prescriptions?: AdminCreatePrescriptionInput[]

  @Field(() => [AdminCreateDocumentInput], { nullable: true }) 
  documents?: AdminCreateDocumentInput[]

  @Field(() => [AdminCreatePatientStudyInput], { nullable: true }) 
  patientStudies?: AdminCreatePatientStudyInput[]

  @Field(() => [AdminCreateClaimInput], { nullable: true }) 
  claims?: AdminCreateClaimInput[]

  @Field(() => [AdminCreateLegalCaseInput], { nullable: true }) 
  legalCases?: AdminCreateLegalCaseInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreateAppointmentInput], { nullable: true }) 
  appointments?: AdminCreateAppointmentInput[]

  @Field(() => [AdminCreateUserInput], { nullable: true }) 
  users?: AdminCreateUserInput[]


  @Field(() => AdminCreateEthnicityInput ,{ nullable: true }) 
  ethnicity?: AdminCreateEthnicityInput  


  @Field(() => AdminCreateGenderInput ,{ nullable: true }) 
  gender?: AdminCreateGenderInput  


  @Field(() => AdminCreateLanguageInput ,{ nullable: true }) 
  language?: AdminCreateLanguageInput  

}