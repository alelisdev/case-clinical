import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'

import { Appointment } from '@case-clinical/api/appointment/data-access'

import { Location } from '@case-clinical/api/location/data-access'
import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'
import { ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access'
import { ProcedureStatus } from '@case-clinical/api/procedure-status/data-access'
import { ProcedureType } from '@case-clinical/api/procedure-type/data-access'


@ObjectType()
export class CaseProcedure {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field({ nullable: true })
  procedureStatusId?: string

  @Field({ nullable: true })
  procedureTypeId?: string

  @Field(() => [PriorAuthorizationRequest], { nullable: true })
  priorAuthorizationRequests?: PriorAuthorizationRequest[]

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

  @Field(() => [ProcedureVendor], { nullable: true })
  procedureVendors?: ProcedureVendor[]


  @Field(() => LegalCase, { nullable: true })
  legalCase?: LegalCase

  @Field(() => Appointment, { nullable: true })
  appointment?: Appointment

  @Field(() => Location, { nullable: true })
  location?: Location

  @Field(() => ProcedureStatus, { nullable: true })
  procedureStatus?: ProcedureStatus

  @Field(() => ProcedureType, { nullable: true })
  procedureType?: ProcedureType

}
