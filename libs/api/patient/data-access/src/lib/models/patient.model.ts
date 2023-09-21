import { Field, ObjectType } from '@nestjs/graphql'

import { Ethnicity } from '@case-clinical/api/ethnicity/data-access'

import { Gender } from '@case-clinical/api/gender/data-access'

import { Language } from '@case-clinical/api/language/data-access'
import { Prescription } from '@case-clinical/api/prescription/data-access'
import { Document } from '@case-clinical/api/document/data-access'
import { PatientStudy } from '@case-clinical/api/patient-study/data-access'
import { Claim } from '@case-clinical/api/claim/data-access'
import { LegalCase } from '@case-clinical/api/legal-case/data-access'
import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'
import { Appointment } from '@case-clinical/api/appointment/data-access'
import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class Patient {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

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
  workEmailAddress?: string

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
  workAddress?: string

  @Field({ nullable: true })
  homeAddress?: string

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

  @Field(() => [Prescription], { nullable: true })
  prescriptions?: Prescription[]

  @Field(() => [Document], { nullable: true })
  documents?: Document[]

  @Field(() => [PatientStudy], { nullable: true })
  patientStudies?: PatientStudy[]

  @Field(() => [Claim], { nullable: true })
  claims?: Claim[]

  @Field(() => [LegalCase], { nullable: true })
  legalCases?: LegalCase[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true })
  priorAuthorizationRequests?: PriorAuthorizationRequest[]

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[]

  @Field(() => [User], { nullable: true })
  users?: User[]


  @Field(() => Ethnicity, { nullable: true })
  ethnicity?: Ethnicity

  @Field(() => Gender, { nullable: true })
  gender?: Gender

  @Field(() => Language, { nullable: true })
  language?: Language

  @Field(() => Document, { nullable: true })
  subpoena?: Document

}
