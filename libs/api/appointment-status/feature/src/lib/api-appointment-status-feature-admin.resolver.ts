
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAppointmentStatusInput,
  AdminListAppointmentStatusInput,
  AdminUpdateAppointmentStatusInput,
  ApiAppointmentStatusDataAccessAdminService,
  AppointmentStatus
} from '@case-clinical/api/appointment-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAppointmentStatusFeatureAdminResolver {
  constructor(private readonly service: ApiAppointmentStatusDataAccessAdminService) {}

  @Query(() => [AppointmentStatus], { nullable: true })
  adminAppointmentStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAppointmentStatusInput, nullable: true }) input?: AdminListAppointmentStatusInput,
  ) {
    return this.service.adminAppointmentStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAppointmentStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAppointmentStatusInput, nullable: true }) input?: AdminListAppointmentStatusInput,
  ) {
    return this.service.adminCountAppointmentStatuses(admin.id, input)
  }





  @Query(() => AppointmentStatus, { nullable: true })
  adminAppointmentStatus(@CtxUser() admin: User, @Args('appointmentStatusId') appointmentStatusId: string) {
    return this.service.adminAppointmentStatus(admin.id, appointmentStatusId)
  }

  @Mutation(() => AppointmentStatus, { nullable: true })
  adminCreateAppointmentStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateAppointmentStatusInput,) {
    return this.service.adminCreateAppointmentStatus(admin.id, input)
  }

  @Mutation(() => AppointmentStatus, { nullable: true })
  adminUpdateAppointmentStatus(
    @CtxUser() admin: User,
    @Args('appointmentStatusId') appointmentStatusId: string,
    @Args('input') input: AdminUpdateAppointmentStatusInput,
  ) {
    return this.service.adminUpdateAppointmentStatus(admin.id, appointmentStatusId, input)
  }

  @Mutation(() => AppointmentStatus, { nullable: true })
  adminDeleteAppointmentStatus(@CtxUser() admin: User, @Args('appointmentStatusId') appointmentStatusId: string) {
    return this.service.adminDeleteAppointmentStatus(admin.id, appointmentStatusId)
  }
}

