
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCalendarTypeInput,
  AdminListCalendarTypeInput,
  AdminUpdateCalendarTypeInput,
  ApiCalendarTypeDataAccessAdminService,
  CalendarType
} from '@case-clinical/api/calendar-type/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListUserCalendarInput, UserCalendar } from '@case-clinical/api/user-calendar/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCalendarTypeFeatureAdminResolver {
  constructor(private readonly service: ApiCalendarTypeDataAccessAdminService) {}

  @Query(() => [CalendarType], { nullable: true })
  adminCalendarTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCalendarTypeInput, nullable: true }) input?: AdminListCalendarTypeInput,
  ) {
    return this.service.adminCalendarTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCalendarTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCalendarTypeInput, nullable: true }) input?: AdminListCalendarTypeInput,
  ) {
    return this.service.adminCountCalendarTypes(admin.id, input)
  }



  @Query(() => [UserCalendar], { nullable: true })
  adminCalendarTypeUserCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCalendarInput, nullable: true }) input?: AdminListUserCalendarInput,
  ) {
    return this.service.adminCalendarTypeUserCalendars(admin.id, input)
  }



  @Query(() => CorePaging, { nullable: true })
  adminCountCalendarTypeUserCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCalendarInput, nullable: true }) input?: AdminListUserCalendarInput,
  ) {
    return this.service.adminCountCalendarTypeUserCalendars(admin.id, input)
  }


  @Query(() => CalendarType, { nullable: true })
  adminCalendarType(@CtxUser() admin: User, @Args('calendarTypeId') calendarTypeId: string) {
    return this.service.adminCalendarType(admin.id, calendarTypeId)
  }

  @Mutation(() => CalendarType, { nullable: true })
  adminCreateCalendarType(@CtxUser() admin: User, @Args('input') input: AdminCreateCalendarTypeInput,) {
    return this.service.adminCreateCalendarType(admin.id, input)
  }

  @Mutation(() => CalendarType, { nullable: true })
  adminUpdateCalendarType(
    @CtxUser() admin: User,
    @Args('calendarTypeId') calendarTypeId: string,
    @Args('input') input: AdminUpdateCalendarTypeInput,
  ) {
    return this.service.adminUpdateCalendarType(admin.id, calendarTypeId, input)
  }

  @Mutation(() => CalendarType, { nullable: true })
  adminDeleteCalendarType(@CtxUser() admin: User, @Args('calendarTypeId') calendarTypeId: string) {
    return this.service.adminDeleteCalendarType(admin.id, calendarTypeId)
  }
}

