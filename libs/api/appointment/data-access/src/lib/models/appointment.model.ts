import { Field, ObjectType } from '@nestjs/graphql'

import { Location } from '@case-clinical/api/location/data-access'

import { Document } from '@case-clinical/api/document/data-access'

import { Patient } from '@case-clinical/api/patient/data-access'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'

import { AppointmentStatus } from '@case-clinical/api/appointment-status/data-access'

import { User } from '@case-clinical/api/user/data-access'
import { VisitKind } from '@case-clinical/api/visit-kind/data-access'

import { MedicalRecordStatus } from '@case-clinical/api/medical-record-status/data-access'
import { ClaimProcedure } from '@case-clinical/api/claim-procedure/data-access' 
import { CaseProcedure } from '@case-clinical/api/case-procedure/data-access' 


@ObjectType()
export class Appointment {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  appointmentDateAndTime?: Date

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  checkedIn?: boolean

  @Field({ nullable: true }) 
  checkedInDateTime?: Date

  @Field({ nullable: true }) 
  medicalReportId?: string

  @Field({ nullable: true }) 
  billId?: string

  @Field({ nullable: true }) 
  imagingId?: string

  @Field({ nullable: true }) 
  miscellaneousId?: string

  @Field({ nullable: true }) 
  finalVisitApproved?: boolean

  @Field({ nullable: true }) 
  visitKindId?: string

  @Field({ nullable: true }) 
  duration?: number

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  appointmentStatusId?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  recurringEventId?: string

  @Field({ nullable: true }) 
  isFirstInstance?: boolean

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  start?: string

  @Field({ nullable: true }) 
  end?: string

  @Field({ nullable: true }) 
  allDay?: boolean

  @Field({ nullable: true }) 
  recurrence?: string

  @Field(() => [ClaimProcedure], { nullable: true }) 
  claimProcedures?: ClaimProcedure[]

  @Field(() => [CaseProcedure], { nullable: true }) 
  caseProcedures?: CaseProcedure[]

  @Field({ nullable: true }) 
  assignedToId?: string

  @Field({ nullable: true }) 
  medicalRecordStatusId?: string


  @Field(() => Location, { nullable: true }) 
  location?: Location  

  @Field(() => Document, { nullable: true }) 
  miscellaneous?: Document  

  @Field(() => Document, { nullable: true }) 
  medicalReport?: Document  

  @Field(() => Document, { nullable: true }) 
  bill?: Document  

  @Field(() => Document, { nullable: true }) 
  imaging?: Document  

  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider  

  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

  @Field(() => AppointmentStatus, { nullable: true }) 
  appointmentStatus?: AppointmentStatus  

  @Field(() => User, { nullable: true }) 
  assignedTo?: User  

  @Field(() => MedicalRecordStatus, { nullable: true }) 
  medicalRecordStatus?: MedicalRecordStatus  

  @Field(() => VisitKind, { nullable: true })
  visitKind?: VisitKind

}
