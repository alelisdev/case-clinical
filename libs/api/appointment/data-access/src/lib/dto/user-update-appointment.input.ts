import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLocationInput } from '@case-clinical/api/location/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateAppointmentStatusInput } from '@case-clinical/api/appointment-status/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdateMedicalRecordStatusInput } from '@case-clinical/api/medical-record-status/data-access' 
import { UserUpdateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { UserUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { UserUpdateVisitKindInput } from '@case-clinical/api/visit-kind/data-access'


@InputType()
export class UserUpdateAppointmentInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserUpdateClaimProcedureInput[]

  @Field(() => [UserUpdateCaseProcedureInput], { nullable: true }) 
  caseProcedures?: UserUpdateCaseProcedureInput[]

  @Field({ nullable: true }) 
  assignedToId?: string

  @Field({ nullable: true }) 
  medicalRecordStatusId?: string


  @Field(() => UserUpdateLocationInput ,{ nullable: true }) 
  location?: UserUpdateLocationInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  miscellaneous?: UserUpdateDocumentInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  medicalReport?: UserUpdateDocumentInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  bill?: UserUpdateDocumentInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  imaging?: UserUpdateDocumentInput  


  @Field(() => UserUpdatePatientInput ,{ nullable: true }) 
  patient?: UserUpdatePatientInput  


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserUpdateLegalCaseInput  


  @Field(() => UserUpdateAppointmentStatusInput ,{ nullable: true }) 
  appointmentStatus?: UserUpdateAppointmentStatusInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  assignedTo?: UserUpdateUserInput  


  @Field(() => UserUpdateMedicalRecordStatusInput ,{ nullable: true }) 
  medicalRecordStatus?: UserUpdateMedicalRecordStatusInput  

  @Field(() => UserUpdateVisitKindInput ,{ nullable: true })
  visitKind?: UserUpdateVisitKindInput

}