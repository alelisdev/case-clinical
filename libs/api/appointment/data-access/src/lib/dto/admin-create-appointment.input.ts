import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLocationInput } from '@case-clinical/api/location/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreateAppointmentStatusInput } from '@case-clinical/api/appointment-status/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminCreateMedicalRecordStatusInput } from '@case-clinical/api/medical-record-status/data-access' 
import { AdminCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { AdminCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 


@InputType()
export class AdminCreateAppointmentInput {

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

  @Field(() => [AdminCreateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: AdminCreateClaimProcedureInput[]

  @Field(() => [AdminCreateCaseProcedureInput], { nullable: true }) 
  caseProcedures?: AdminCreateCaseProcedureInput[]

  @Field({ nullable: true }) 
  assignedToId?: string

  @Field({ nullable: true }) 
  medicalRecordStatusId?: string


  @Field(() => AdminCreateLocationInput ,{ nullable: true }) 
  location?: AdminCreateLocationInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  miscellaneous?: AdminCreateDocumentInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  medicalReport?: AdminCreateDocumentInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  bill?: AdminCreateDocumentInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  imaging?: AdminCreateDocumentInput  


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  


  @Field(() => AdminCreateAppointmentStatusInput ,{ nullable: true }) 
  appointmentStatus?: AdminCreateAppointmentStatusInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  assignedTo?: AdminCreateUserInput  


  @Field(() => AdminCreateMedicalRecordStatusInput ,{ nullable: true }) 
  medicalRecordStatus?: AdminCreateMedicalRecordStatusInput  

}