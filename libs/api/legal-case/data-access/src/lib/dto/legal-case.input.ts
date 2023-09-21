import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class LegalCaseInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  medLevelId?: string

  @Field({ nullable: true }) 
  firmId?: string

  @Field({ nullable: true }) 
  attorneyId?: string

  @Field({ nullable: true }) 
  agentId?: string

  @Field({ nullable: true }) 
  caseStatusId?: string

  @Field({ nullable: true }) 
  caseTypeId?: string

  @Field({ nullable: true }) 
  patientTreatmentStatusId?: string

  @Field({ nullable: true }) 
  medicalRecordNumber?: string

  @Field({ nullable: true }) 
  pharmacyControlNumber?: string

  @Field({ nullable: true }) 
  pchGroupNumber?: string

  @Field({ nullable: true }) 
  dateOfLoss?: Date

  @Field({ nullable: true }) 
  caseStatusDate?: Date

  @Field({ nullable: true }) 
  caseStatusOther?: string

  @Field({ nullable: true }) 
  paralegal?: string

  @Field({ nullable: true }) 
  paralegalContact?: string

  @Field({ nullable: true }) 
  caseNoteSummary?: string

  @Field({ nullable: true }) 
  policyLimit?: number

  @Field({ nullable: true }) 
  attorneyFee?: number

  @Field({ nullable: true }) 
  referringPhysician?: string

  @Field({ nullable: true }) 
  noMoreTreatment?: boolean

  @Field({ nullable: true }) 
  medpay?: boolean

  @Field({ nullable: true }) 
  fileNumber?: string

  @Field({ nullable: true }) 
  caseNumber?: string

  @Field({ nullable: true }) 
  accidentState?: string

  @Field({ nullable: true }) 
  assignedTo?: string

  @Field({ nullable: true }) 
  attorneyPaid?: boolean

  @Field({ nullable: true }) 
  attorneySentDate?: Date

  @Field({ nullable: true }) 
  writeOff?: boolean

  @Field({ nullable: true }) 
  noMRI?: boolean

  @Field({ nullable: true }) 
  noPT?: boolean

  @Field({ nullable: true }) 
  noFirstAppointment?: boolean

  @Field({ nullable: true }) 
  hot?: boolean

  @Field({ nullable: true }) 
  documentsUploaded?: boolean

  @Field({ nullable: true }) 
  attorneyReview?: boolean

  @Field({ nullable: true }) 
  escalatedReview?: boolean

  @Field({ nullable: true }) 
  inActive?: boolean

  @Field({ nullable: true }) 
  criteria1712?: boolean

  @Field({ nullable: true }) 
  documentUploadedDate?: Date

  @Field({ nullable: true }) 
  patientDischargedGatheringRecordsDate?: Date

  @Field({ nullable: true }) 
  resubmitted?: Date

  @Field({ nullable: true }) 
  caseProgressStatusId?: string

  @Field({ nullable: true }) 
  firmCaseManager?: string

  @Field({ nullable: true }) 
  adverseInsuranceStatusId?: string

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  renegotiatePayOffDate?: Date









}
