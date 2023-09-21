import { Field, InputType } from '@nestjs/graphql'

import { UserCreateEthnicityInput } from '@case-clinical/api/ethnicity/data-access' 
import { UserCreateGenderInput } from '@case-clinical/api/gender/data-access' 
import { UserCreateLanguageInput } from '@case-clinical/api/language/data-access' 
import { UserCreatePrescriptionInput } from '@case-clinical/api/prescription/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreatePatientStudyInput } from '@case-clinical/api/patient-study/data-access' 
import { UserCreateClaimInput } from '@case-clinical/api/claim/data-access' 
import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserCreatePatientInput {

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
  workAddress?: string

  @Field({ nullable: true }) 
  homeAddress?: string

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

  @Field({ nullable: true })
  subpoenaId?: string

  @Field(() => [UserCreatePrescriptionInput], { nullable: true }) 
  prescriptions?: UserCreatePrescriptionInput[]

  @Field(() => [UserCreateDocumentInput], { nullable: true }) 
  documents?: UserCreateDocumentInput[]

  @Field(() => [UserCreatePatientStudyInput], { nullable: true }) 
  patientStudies?: UserCreatePatientStudyInput[]

  @Field(() => [UserCreateClaimInput], { nullable: true }) 
  claims?: UserCreateClaimInput[]

  @Field(() => [UserCreateLegalCaseInput], { nullable: true }) 
  legalCases?: UserCreateLegalCaseInput[]

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreateAppointmentInput], { nullable: true }) 
  appointments?: UserCreateAppointmentInput[]

  @Field(() => [UserCreateUserInput], { nullable: true }) 
  users?: UserCreateUserInput[]


  @Field(() => UserCreateEthnicityInput ,{ nullable: true }) 
  ethnicity?: UserCreateEthnicityInput  


  @Field(() => UserCreateGenderInput ,{ nullable: true }) 
  gender?: UserCreateGenderInput  


  @Field(() => UserCreateLanguageInput ,{ nullable: true }) 
  language?: UserCreateLanguageInput  

  @Field(() => UserCreateDocumentInput ,{ nullable: true })
  subpoena?: UserCreateDocumentInput

}
