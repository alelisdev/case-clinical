import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserUpdateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 


@InputType()
export class UserUpdateClaimInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  originalRecordDate?: Date

  @Field({ nullable: true }) 
  receivedDate?: Date

  @Field({ nullable: true }) 
  dueDate?: Date

  @Field({ nullable: true }) 
  patientName?: string

  @Field({ nullable: true }) 
  patientPhoneNumber?: string

  @Field({ nullable: true }) 
  patientDob?: string

  @Field({ nullable: true }) 
  patientAddressLine1?: string

  @Field({ nullable: true }) 
  patientAddressCity?: string

  @Field({ nullable: true }) 
  patientAddressState?: string

  @Field({ nullable: true }) 
  patientAddressPostalCode?: string

  @Field({ nullable: true }) 
  carrierName?: string

  @Field({ nullable: true }) 
  carrierLine1?: string

  @Field({ nullable: true }) 
  carrierLine2?: string

  @Field({ nullable: true }) 
  carrierCity?: string

  @Field({ nullable: true }) 
  carrierState?: string

  @Field({ nullable: true }) 
  carrierPostalCode?: string

  @Field({ nullable: true }) 
  insuredName?: string

  @Field({ nullable: true }) 
  insuredLine1?: string

  @Field({ nullable: true }) 
  insuredCity?: string

  @Field({ nullable: true }) 
  insuredState?: string

  @Field({ nullable: true }) 
  insuredPostalCode?: string

  @Field({ nullable: true }) 
  insuredIdNumber?: string

  @Field({ nullable: true }) 
  insuredDob?: string

  @Field({ nullable: true }) 
  insuredPhoneNumber?: string

  @Field({ nullable: true }) 
  patientSignature?: string

  @Field({ nullable: true }) 
  diagnosisCode1?: string

  @Field({ nullable: true }) 
  diagnosisCode2?: string

  @Field({ nullable: true }) 
  diagnosisCode3?: string

  @Field({ nullable: true }) 
  diagnosisCode4?: string

  @Field({ nullable: true }) 
  diagnosisCode5?: string

  @Field({ nullable: true }) 
  diagnosisCode6?: string

  @Field({ nullable: true }) 
  diagnosisCode7?: string

  @Field({ nullable: true }) 
  diagnosisCode8?: string

  @Field({ nullable: true }) 
  federalTaxId?: string

  @Field({ nullable: true }) 
  totalCharges?: number

  @Field({ nullable: true }) 
  amountPaid?: number

  @Field({ nullable: true }) 
  physicianSignature?: string

  @Field({ nullable: true }) 
  physicianSignedOn?: string

  @Field({ nullable: true }) 
  serviceFacility?: string

  @Field({ nullable: true }) 
  serviceFacilityLine1?: string

  @Field({ nullable: true }) 
  serviceFacilityCity?: string

  @Field({ nullable: true }) 
  serviceFacilityState?: string

  @Field({ nullable: true }) 
  serviceFacilityPostalCode?: string

  @Field({ nullable: true }) 
  serviceFacilityNpi?: string

  @Field({ nullable: true }) 
  billingFacility?: string

  @Field({ nullable: true }) 
  billingLine1?: string

  @Field({ nullable: true }) 
  billingCity?: string

  @Field({ nullable: true }) 
  billingState?: string

  @Field({ nullable: true }) 
  billingPostalCode?: string

  @Field({ nullable: true }) 
  billingNpi?: string

  @Field({ nullable: true }) 
  billingPhoneNumber?: string

  @Field({ nullable: true }) 
  billingOther?: string

  @Field({ nullable: true }) 
  sessionNotes?: string

  @Field({ nullable: true }) 
  referringProvider?: string

  @Field({ nullable: true }) 
  referringProviderNpi?: string

  @Field({ nullable: true }) 
  additionalClaimInfo?: string

  @Field({ nullable: true }) 
  accountNumber?: string

  @Field({ nullable: true }) 
  referenceNumber?: string

  @Field({ nullable: true }) 
  facility?: string

  @Field({ nullable: true }) 
  priorAuthorizationNumber?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string

  @Field({ nullable: true }) 
  providerName?: string

  @Field({ nullable: true }) 
  providerNumber?: string

  @Field({ nullable: true }) 
  vendor?: string

  @Field({ nullable: true }) 
  vendorLine1?: string

  @Field({ nullable: true }) 
  vendorCSZ?: string

  @Field({ nullable: true }) 
  vendorTaxId?: string

  @Field({ nullable: true }) 
  totalApprovedAmount?: number

  @Field({ nullable: true }) 
  totalBilledAmount?: number

  @Field({ nullable: true }) 
  totalNetPayAmount?: number

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  claimId?: string

  @Field({ nullable: true }) 
  explanationOfPaymentId?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field(() => [UserUpdateClaimProcedureInput], { nullable: true }) 
  procedures?: UserUpdateClaimProcedureInput[]


  @Field(() => UserUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserUpdatePriorAuthorizationRequestInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  claim?: UserUpdateDocumentInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  explanationOfPayment?: UserUpdateDocumentInput  


  @Field(() => UserUpdatePatientInput ,{ nullable: true }) 
  patient?: UserUpdatePatientInput  

}