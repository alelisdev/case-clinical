import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { AdminCreateLocationInput } from '@case-clinical/api/location/data-access'
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'
import { AdminCreateProcedureStatusInput } from '@case-clinical/api/procedure-status/data-access'
import { AdminCreateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'


@InputType()
export class AdminCreateCaseProcedureInput {

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

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true })
  priorAuthorizationRequests?: AdminCreatePriorAuthorizationRequestInput[]

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

  @Field(() => [AdminCreateProcedureVendorInput], { nullable: true })
  procedureVendors?: AdminCreateProcedureVendorInput[]


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true })
  legalCase?: AdminCreateLegalCaseInput

  @Field(() => AdminCreateProcedureStatusInput ,{ nullable: true })
  procedureStatus?: AdminCreateProcedureStatusInput

  @Field(() => AdminCreateAppointmentInput ,{ nullable: true })
  appointment?: AdminCreateAppointmentInput


  @Field(() => AdminCreateLocationInput ,{ nullable: true })
  location?: AdminCreateLocationInput

  @Field(() => AdminCreateProcedureTypeInput ,{ nullable: true })
  procedureType?: AdminCreateProcedureTypeInput

}
