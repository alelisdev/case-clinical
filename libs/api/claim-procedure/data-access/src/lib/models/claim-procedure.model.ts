import { Field, ObjectType } from '@nestjs/graphql'

import { PlaceOfService } from '@case-clinical/api/place-of-service/data-access'

import { ClaimStatus } from '@case-clinical/api/claim-status/data-access'

import { Claim } from '@case-clinical/api/claim/data-access'

import { Appointment } from '@case-clinical/api/appointment/data-access'

import { Procedure } from '@case-clinical/api/procedure/data-access'
import { CaseAccount } from '@case-clinical/api/case-account/data-access' 


@ObjectType()
export class ClaimProcedure {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  claimProcedureCodeId?: string

  @Field({ nullable: true }) 
  procedureCodeId?: string

  @Field({ nullable: true }) 
  claimId?: string

  @Field({ nullable: true }) 
  fromDateOfService?: Date

  @Field({ nullable: true }) 
  toDateOfService?: Date

  @Field({ nullable: true }) 
  placeOfServiceId?: string

  @Field({ nullable: true }) 
  nationalDrugCode?: string

  @Field({ nullable: true }) 
  drugUnit?: string

  @Field({ nullable: true }) 
  drugQuantity?: string

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  billedAmount?: number

  @Field({ nullable: true }) 
  approvedAmount?: number

  @Field({ nullable: true }) 
  adjustmentAmount?: number

  @Field({ nullable: true }) 
  netPaymentAmount?: number

  @Field({ nullable: true }) 
  paymentMethod?: string

  @Field({ nullable: true }) 
  internalMemo?: string

  @Field({ nullable: true }) 
  explainationOfBenefitsComment?: string

  @Field({ nullable: true }) 
  claimStatusId?: string

  @Field({ nullable: true }) 
  reason?: string

  @Field({ nullable: true }) 
  procedureCode?: string

  @Field({ nullable: true }) 
  diagnosisPointer?: string

  @Field({ nullable: true }) 
  modifier1?: string

  @Field({ nullable: true }) 
  modifier2?: string

  @Field({ nullable: true }) 
  modifier3?: string

  @Field({ nullable: true }) 
  modifier4?: string

  @Field({ nullable: true }) 
  appointmentId?: string

  @Field({ nullable: true }) 
  procedureId?: string

  @Field(() => [CaseAccount], { nullable: true }) 
  caseAccounts?: CaseAccount[]


  @Field(() => PlaceOfService, { nullable: true }) 
  placeOfService?: PlaceOfService  

  @Field(() => ClaimStatus, { nullable: true }) 
  claimStatus?: ClaimStatus  

  @Field(() => Claim, { nullable: true }) 
  claim?: Claim  

  @Field(() => Appointment, { nullable: true }) 
  appointment?: Appointment  

  @Field(() => Procedure, { nullable: true }) 
  procedure?: Procedure  

}
