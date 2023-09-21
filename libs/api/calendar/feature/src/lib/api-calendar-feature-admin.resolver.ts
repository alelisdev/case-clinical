
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCalendarInput,
  AdminListCalendarInput,
  AdminUpdateCalendarInput,
  ApiCalendarDataAccessAdminService,
  Calendar
} from '@case-clinical/api/calendar/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { of } from 'rxjs'
import { AdminListUserCalendarInput, UserCalendar } from '@case-clinical/api/user-calendar/data-access'
import { AdminListAppointmentInput, Appointment } from '@case-clinical/api/appointment/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCalendarFeatureAdminResolver {
  constructor(private readonly service: ApiCalendarDataAccessAdminService) {}

  @Query(() => [Calendar], { nullable: true })
  adminCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCalendarInput, nullable: true }) input?: AdminListCalendarInput,
  ) {
    return this.service.adminCalendars(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCalendarInput, nullable: true }) input?: AdminListCalendarInput,
  ) {
    return this.service.adminCountCalendars(admin.id, input)
  }



  @Query(() => [UserCalendar], { nullable: true })
  adminCalendarUserCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCalendarInput, nullable: true }) input?: AdminListUserCalendarInput,
  ) {
    return this.service.adminCalendarUserCalendars(admin.id, input)
  }



  @Query(() => [Appointment], { nullable: true })
  adminCalendarAppointments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAppointmentInput, nullable: true }) input?: AdminListAppointmentInput,
  ) {
    return this.service.adminCalendarAppointments(admin.id, input)
  }



  @Query(() => CorePaging, { nullable: true })
  adminCountCalendarUserCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCalendarInput, nullable: true }) input?: AdminListUserCalendarInput,
  ) {
    return this.service.adminCountCalendarUserCalendars(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountCalendarAppointments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAppointmentInput, nullable: true }) input?: AdminListAppointmentInput,
  ) {
    return of([])
  }


  @Query(() => Calendar, { nullable: true })
  adminCalendar(@CtxUser() admin: User, @Args('calendarId') calendarId: string) {
    return this.service.adminCalendar(admin.id, calendarId)
  }

  @Mutation(() => Calendar, { nullable: true })
  adminCreateCalendar(@CtxUser() admin: User, @Args('input') input: AdminCreateCalendarInput,) {
    return this.service.adminCreateCalendar(admin.id, input)
  }

  @Mutation(() => Calendar, { nullable: true })
  adminUpdateCalendar(
    @CtxUser() admin: User,
    @Args('calendarId') calendarId: string,
    @Args('input') input: AdminUpdateCalendarInput,
  ) {
    return this.service.adminUpdateCalendar(admin.id, calendarId, input)
  }

  @Mutation(() => Calendar, { nullable: true })
  adminDeleteCalendar(@CtxUser() admin: User, @Args('calendarId') calendarId: string) {
    return this.service.adminDeleteCalendar(admin.id, calendarId)
  }
}

