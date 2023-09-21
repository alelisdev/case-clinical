
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCalendarWeekdayInput,
  UserListCalendarWeekdayInput,
  UserUpdateCalendarWeekdayInput,
  ApiCalendarWeekdayDataAccessUserService,
  CalendarWeekday,
} from '@case-clinical/api/calendar-weekday/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCalendarWeekdayFeatureUserResolver {
  constructor(private readonly service: ApiCalendarWeekdayDataAccessUserService) {}

  @Query(() => [CalendarWeekday], { nullable: true })
  userCalendarWeekdays(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalendarWeekdayInput, nullable: true }) input?: UserListCalendarWeekdayInput,
  ) {
    return this.service.userCalendarWeekdays(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCalendarWeekdays(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalendarWeekdayInput, nullable: true }) input?: UserListCalendarWeekdayInput,
  ) {
    return this.service.userCountCalendarWeekdays(user.id, input)
  }






  @Query(() => CalendarWeekday, { nullable: true })
  userCalendarWeekday(@CtxUser() user: User, @Args('calendarWeekdayId') calendarWeekdayId: string) {
    return this.service.userCalendarWeekday(user.id, calendarWeekdayId)
  }

  @Mutation(() => CalendarWeekday, { nullable: true })
  userCreateCalendarWeekday(@CtxUser() user: User, @Args('input') input: UserCreateCalendarWeekdayInput,) {
    return this.service.userCreateCalendarWeekday(user.id, input)
  }

  @Mutation(() => CalendarWeekday, { nullable: true })
  userUpdateCalendarWeekday(
    @CtxUser() user: User,
    @Args('calendarWeekdayId') calendarWeekdayId: string,
    @Args('input') input: UserUpdateCalendarWeekdayInput,
  ) {
    return this.service.userUpdateCalendarWeekday(user.id, calendarWeekdayId, input)
  }

  @Mutation(() => CalendarWeekday, { nullable: true })
  userDeleteCalendarWeekday(@CtxUser() user: User, @Args('calendarWeekdayId') calendarWeekdayId: string) {
    return this.service.userDeleteCalendarWeekday(user.id, calendarWeekdayId)
  }
}

