
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAppointmentInput,
  AdminListAppointmentInput,
  AdminUpdateAppointmentInput,
  ApiAppointmentDataAccessAdminService,
  Appointment
} from '@case-clinical/api/appointment/data-access'


import { AdminListLocationInput, Location } from '@case-clinical/api/location/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListAppointmentStatusInput, AppointmentStatus } from '@case-clinical/api/appointment-status/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'
import { AdminListMedicalRecordStatusInput, MedicalRecordStatus } from '@case-clinical/api/medical-record-status/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAppointmentFeatureAdminResolver {
  constructor(private readonly service: ApiAppointmentDataAccessAdminService) {}

  @Query(() => [Appointment], { nullable: true })
  adminAppointments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAppointmentInput, nullable: true }) input?: AdminListAppointmentInput,
  ) {
    return this.service.adminAppointments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAppointments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAppointmentInput, nullable: true }) input?: AdminListAppointmentInput,
  ) {
    return this.service.adminCountAppointments(admin.id, input)
  }





  @Query(() => Appointment, { nullable: true })
  adminAppointment(@CtxUser() admin: User, @Args('appointmentId') appointmentId: string) {
    return this.service.adminAppointment(admin.id, appointmentId)
  }

  @Mutation(() => Appointment, { nullable: true })
  adminCreateAppointment(@CtxUser() admin: User, @Args('input') input: AdminCreateAppointmentInput,) {
    return this.service.adminCreateAppointment(admin.id, input)
  }

  @Mutation(() => Appointment, { nullable: true })
  adminUpdateAppointment(
    @CtxUser() admin: User,
    @Args('appointmentId') appointmentId: string,
    @Args('input') input: AdminUpdateAppointmentInput,
  ) {
    return this.service.adminUpdateAppointment(admin.id, appointmentId, input)
  }

  @Mutation(() => Appointment, { nullable: true })
  adminDeleteAppointment(@CtxUser() admin: User, @Args('appointmentId') appointmentId: string) {
    return this.service.adminDeleteAppointment(admin.id, appointmentId)
  }
}

