
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAppointmentStatusInput,
  UserListAppointmentStatusInput,
  UserUpdateAppointmentStatusInput,
  UserUpdateAppointmentStatusesInput,
  ApiAppointmentStatusDataAccessUserService,
  AppointmentStatus,
} from '@case-clinical/api/appointment-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAppointmentStatusFeatureUserResolver {
  constructor(private readonly service: ApiAppointmentStatusDataAccessUserService) {}

  @Query(() => [AppointmentStatus], { nullable: true })
  userAppointmentStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAppointmentStatusInput, nullable: true }) input?: UserListAppointmentStatusInput,
  ) {
    return this.service.userAppointmentStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAppointmentStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAppointmentStatusInput, nullable: true }) input?: UserListAppointmentStatusInput,
  ) {
    return this.service.userCountAppointmentStatuses(user.id, input)
  }

  @Query(() => [AppointmentStatus], { nullable: true })
  userSelectAppointmentStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAppointmentStatusInput, nullable: true }) input?: UserListAppointmentStatusInput,
  ) {
    return this.service.userSelectAppointmentStatuses(user.id, input)
  }







  @Query(() => AppointmentStatus, { nullable: true })
  userAppointmentStatus(@CtxUser() user: User, @Args('appointmentStatusId') appointmentStatusId: string) {
    return this.service.userAppointmentStatus(user.id, appointmentStatusId)
  }

  @Mutation(() => AppointmentStatus, { nullable: true })
  userCreateAppointmentStatus(@CtxUser() user: User, @Args('input') input: UserCreateAppointmentStatusInput,) {
    return this.service.userCreateAppointmentStatus(user.id, input)
  }

  @Mutation(() => AppointmentStatus, { nullable: true })
  userUpdateAppointmentStatus(
    @CtxUser() user: User,
    @Args('appointmentStatusId') appointmentStatusId: string,
    @Args('input') input: UserUpdateAppointmentStatusInput,
  ) {
    return this.service.userUpdateAppointmentStatus(user.id, appointmentStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAppointmentStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAppointmentStatusesInput,
  ) {
    return this.service.userUpdateAppointmentStatuses(user.id, input)
  }

  @Mutation(() => AppointmentStatus, { nullable: true })
  userDeleteAppointmentStatus(@CtxUser() user: User, @Args('appointmentStatusId') appointmentStatusId: string) {
    return this.service.userDeleteAppointmentStatus(user.id, appointmentStatusId)
  }
}

