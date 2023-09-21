
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCalendarTypeInput,
  UserListCalendarTypeInput,
  UserUpdateCalendarTypeInput,
  ApiCalendarTypeDataAccessUserService,
  CalendarType,
} from '@case-clinical/api/calendar-type/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListUserCalendarInput, UserCalendar } from '@case-clinical/api/user-calendar/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCalendarTypeFeatureUserResolver {
  constructor(private readonly service: ApiCalendarTypeDataAccessUserService) {}

  @Query(() => [CalendarType], { nullable: true })
  userCalendarTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalendarTypeInput, nullable: true }) input?: UserListCalendarTypeInput,
  ) {
    return this.service.userCalendarTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCalendarTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalendarTypeInput, nullable: true }) input?: UserListCalendarTypeInput,
  ) {
    return this.service.userCountCalendarTypes(user.id, input)
  }



  @Query(() => [UserCalendar], { nullable: true })
  userCalendarTypeUserCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  ) {
    return this.service.userCalendarTypeUserCalendars(user.id, input)
  }



  @Query(() => CorePaging, { nullable: true })
  userCountCalendarTypeUserCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  ) {
    return this.service.userCountCalendarTypeUserCalendars(user.id, input)
  }



  @Query(() => CalendarType, { nullable: true })
  userCalendarType(@CtxUser() user: User, @Args('calendarTypeId') calendarTypeId: string) {
    return this.service.userCalendarType(user.id, calendarTypeId)
  }

  @Mutation(() => CalendarType, { nullable: true })
  userCreateCalendarType(@CtxUser() user: User, @Args('input') input: UserCreateCalendarTypeInput,) {
    return this.service.userCreateCalendarType(user.id, input)
  }

  @Mutation(() => CalendarType, { nullable: true })
  userUpdateCalendarType(
    @CtxUser() user: User,
    @Args('calendarTypeId') calendarTypeId: string,
    @Args('input') input: UserUpdateCalendarTypeInput,
  ) {
    return this.service.userUpdateCalendarType(user.id, calendarTypeId, input)
  }

  @Mutation(() => CalendarType, { nullable: true })
  userDeleteCalendarType(@CtxUser() user: User, @Args('calendarTypeId') calendarTypeId: string) {
    return this.service.userDeleteCalendarType(user.id, calendarTypeId)
  }
}

