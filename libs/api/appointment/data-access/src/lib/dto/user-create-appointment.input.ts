import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLocationInput } from '@case-clinical/api/location/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreateAppointmentStatusInput } from '@case-clinical/api/appointment-status/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateMedicalRecordStatusInput } from '@case-clinical/api/medical-record-status/data-access' 
import { UserCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { UserCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { UserCreateVisitKindInput } from '@case-clinical/api/visit-kind/data-access'



@InputType()
export class UserCreateAppointmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  appointmentDateAndTime?: Date

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  checkedIn?: boolean

  @Field({ nullable: true })
  notifyProvider?: boolean

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

  @Field(() => [UserCreateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserCreateClaimProcedureInput[]

  @Field(() => [UserCreateCaseProcedureInput], { nullable: true }) 
  caseProcedures?: UserCreateCaseProcedureInput[]

  @Field({ nullable: true }) 
  assignedToId?: string

  @Field({ nullable: true }) 
  medicalRecordStatusId?: string


  @Field(() => UserCreateLocationInput ,{ nullable: true }) 
  location?: UserCreateLocationInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  miscellaneous?: UserCreateDocumentInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  medicalReport?: UserCreateDocumentInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  bill?: UserCreateDocumentInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  imaging?: UserCreateDocumentInput  


  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  


  @Field(() => UserCreateAppointmentStatusInput ,{ nullable: true }) 
  appointmentStatus?: UserCreateAppointmentStatusInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  assignedTo?: UserCreateUserInput  


  @Field(() => UserCreateMedicalRecordStatusInput ,{ nullable: true }) 
  medicalRecordStatus?: UserCreateMedicalRecordStatusInput  

  
  @Field(() => UserCreateVisitKindInput ,{ nullable: true })
  visitKind?: UserCreateVisitKindInput

}
