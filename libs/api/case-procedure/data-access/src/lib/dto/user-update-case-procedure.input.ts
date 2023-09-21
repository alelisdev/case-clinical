import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { UserUpdateLocationInput } from '@case-clinical/api/location/data-access'
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { UserUpdateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'
import { UserUpdateProcedureStatusInput } from '@case-clinical/api/procedure-status/data-access'
import { UserUpdateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'


@InputType()
export class UserUpdateCaseProcedureInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field({ nullable: true })
  procedureStatusId?: string

  @Field({ nullable: true })
  procedureTypeId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true })
  priorAuthorizationRequests?: UserUpdatePriorAuthorizationRequestInput[]

  @Field({ nullable: true })
  procedureDate?: Date

  @Field({ nullable: true })
  cost?: number

  @Field({ nullable: true })
  notes?: string

  @Field({ nullable: true })
  createdBy?: string

  @Field({ nullable: true })
  dateCreated?: Date

  @Field({ nullable: true })
  removed?: boolean

  @Field({ nullable: true })
  approvedDate?: Date

  @Field({ nullable: true })
  procedureReasonName?: string

  @Field({ nullable: true })
  decisionDate?: Date

  @Field({ nullable: true })
  nextActionDate?: Date

  @Field(() => [UserUpdateProcedureVendorInput], { nullable: true })
  procedureVendors?: UserUpdateProcedureVendorInput[]


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true })
  legalCase?: UserUpdateLegalCaseInput


  @Field(() => UserUpdateAppointmentInput ,{ nullable: true })
  appointment?: UserUpdateAppointmentInput


  @Field(() => UserUpdateLocationInput ,{ nullable: true })
  location?: UserUpdateLocationInput

  @Field(() => UserUpdateProcedureStatusInput ,{ nullable: true })
  procedureStatus?: UserUpdateProcedureStatusInput

  @Field(() => UserUpdateProcedureTypeInput ,{ nullable: true })
  procedureType?: UserUpdateProcedureTypeInput
}
