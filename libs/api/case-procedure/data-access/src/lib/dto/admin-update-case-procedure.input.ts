import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { AdminUpdateLocationInput } from '@case-clinical/api/location/data-access'
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { UserUpdateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'
import { AdminUpdateProcedureStatusInput } from '@case-clinical/api/procedure-status/data-access'
import { AdminUpdateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'


@InputType()
export class AdminUpdateCaseProcedureInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  procedureStatusId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field({ nullable: true })
  procedureTypeId?: string

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


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true })
  legalCase?: AdminUpdateLegalCaseInput


  @Field(() => AdminUpdateAppointmentInput ,{ nullable: true })
  appointment?: AdminUpdateAppointmentInput

  @Field(() => AdminUpdateProcedureStatusInput ,{ nullable: true })
  procedureStatus?: AdminUpdateProcedureStatusInput


  @Field(() => AdminUpdateLocationInput ,{ nullable: true })
  location?: AdminUpdateLocationInput

  @Field(() => AdminUpdateProcedureTypeInput ,{ nullable: true })
  procedureType?: AdminUpdateProcedureTypeInput

}
