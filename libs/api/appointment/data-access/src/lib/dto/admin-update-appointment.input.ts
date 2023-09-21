import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLocationInput } from '@case-clinical/api/location/data-access' 
import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminUpdateAppointmentStatusInput } from '@case-clinical/api/appointment-status/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminUpdateMedicalRecordStatusInput } from '@case-clinical/api/medical-record-status/data-access' 
import { UserUpdateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { UserUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 


@InputType()
export class AdminUpdateAppointmentInput {

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


  @Field(() => AdminUpdateLocationInput ,{ nullable: true }) 
  location?: AdminUpdateLocationInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  miscellaneous?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  medicalReport?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  bill?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  imaging?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdatePatientInput ,{ nullable: true }) 
  patient?: AdminUpdatePatientInput  


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  


  @Field(() => AdminUpdateAppointmentStatusInput ,{ nullable: true }) 
  appointmentStatus?: AdminUpdateAppointmentStatusInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  assignedTo?: AdminUpdateUserInput  


  @Field(() => AdminUpdateMedicalRecordStatusInput ,{ nullable: true }) 
  medicalRecordStatus?: AdminUpdateMedicalRecordStatusInput  

}