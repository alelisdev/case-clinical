import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { UserCreateLocationInput } from '@case-clinical/api/location/data-access'
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { UserCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'
import { UserCreateProcedureStatusInput } from '@case-clinical/api/procedure-status/data-access'
import { UserCreateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'


@InputType()
export class UserCreateCaseProcedureInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field({ nullable: true })
  procedureStatusId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field({ nullable: true })
  procedureTypeId?: string

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true })
  priorAuthorizationRequests?: UserCreatePriorAuthorizationRequestInput[]

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

  @Field(() => [UserCreateProcedureVendorInput], { nullable: true })
  procedureVendors?: UserCreateProcedureVendorInput[]


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true })
  legalCase?: UserCreateLegalCaseInput


  @Field(() => UserCreateAppointmentInput ,{ nullable: true })
  appointment?: UserCreateAppointmentInput

  @Field(() => UserCreateProcedureStatusInput ,{ nullable: true })
  procedureStatus?: UserCreateProcedureStatusInput

  @Field(() => UserCreateProcedureTypeInput ,{ nullable: true })
  procedureType?: UserCreateProcedureTypeInput


  @Field(() => UserCreateLocationInput ,{ nullable: true })
  location?: UserCreateLocationInput

}
