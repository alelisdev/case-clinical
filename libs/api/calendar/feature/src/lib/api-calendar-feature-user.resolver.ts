
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCalendarInput,
  UserListCalendarInput,
  UserUpdateCalendarInput,
  ApiCalendarDataAccessUserService,
  Calendar,
} from '@case-clinical/api/calendar/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListUserCalendarInput, UserCalendar } from '@case-clinical/api/user-calendar/data-access'
import { UserListAppointmentInput, Appointment } from '@case-clinical/api/appointment/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCalendarFeatureUserResolver {
  constructor(private readonly service: ApiCalendarDataAccessUserService) {}

  @Query(() => [Calendar], { nullable: true })
  userCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalendarInput, nullable: true }) input?: UserListCalendarInput,
  ) {
    return this.service.userCalendars(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalendarInput, nullable: true }) input?: UserListCalendarInput,
  ) {
    return this.service.userCountCalendars(user.id, input)
  }



  @Query(() => [UserCalendar], { nullable: true })
  userCalendarUserCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  ) {
    return this.service.userCalendarUserCalendars(user.id, input)
  }



  @Query(() => [Appointment], { nullable: true })
  userCalendarAppointments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  ) {
    return this.service.userCalendarAppointments(user.id, input)
  }



  // @Query(() => CorePaging, { nullable: true })
  // userCountCalendarUserCalendars(
  //   @CtxUser() user: User,
  //   @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  // ) {
  //   return this.service.userCountCalendarUserCalendars(user.id, input)
  // }


  // @Query(() => CorePaging, { nullable: true })
  // userCountCalendarAppointments(
  //   @CtxUser() user: User,
  //   @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  // ) {
  //   return this.service.userCountCalendarAppointments(user.id, input)
  // }



  @Query(() => Calendar, { nullable: true })
  userCalendar(@CtxUser() user: User, @Args('calendarId') calendarId: string) {
    return this.service.userCalendar(user.id, calendarId)
  }

  @Mutation(() => Calendar, { nullable: true })
  userCreateCalendar(@CtxUser() user: User, @Args('input') input: UserCreateCalendarInput,) {
    return this.service.userCreateCalendar(user.id, input)
  }

  @Mutation(() => Calendar, { nullable: true })
  userUpdateCalendar(
    @CtxUser() user: User,
    @Args('calendarId') calendarId: string,
    @Args('input') input: UserUpdateCalendarInput,
  ) {
    return this.service.userUpdateCalendar(user.id, calendarId, input)
  }

  @Mutation(() => Calendar, { nullable: true })
  userDeleteCalendar(@CtxUser() user: User, @Args('calendarId') calendarId: string) {
    return this.service.userDeleteCalendar(user.id, calendarId)
  }
}

