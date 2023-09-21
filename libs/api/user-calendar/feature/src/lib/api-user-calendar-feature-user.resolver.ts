
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateUserCalendarInput,
  UserListUserCalendarInput,
  UserUpdateUserCalendarInput,
  ApiUserCalendarDataAccessUserService,
  UserCalendar,
} from '@case-clinical/api/user-calendar/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiUserCalendarFeatureUserResolver {
  constructor(private readonly service: ApiUserCalendarDataAccessUserService) {}

  @Query(() => [UserCalendar], { nullable: true })
  userUserCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  ) {
    return this.service.userUserCalendars(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountUserCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  ) {
    return this.service.userCountUserCalendars(user.id, input)
  }






  @Query(() => UserCalendar, { nullable: true })
  userUserCalendar(@CtxUser() user: User, @Args('userCalendarId') userCalendarId: string) {
    return this.service.userUserCalendar(user.id, userCalendarId)
  }

  @Mutation(() => UserCalendar, { nullable: true })
  userCreateUserCalendar(@CtxUser() user: User, @Args('input') input: UserCreateUserCalendarInput,) {
    return this.service.userCreateUserCalendar(user.id, input)
  }

  @Mutation(() => UserCalendar, { nullable: true })
  userUpdateUserCalendar(
    @CtxUser() user: User,
    @Args('userCalendarId') userCalendarId: string,
    @Args('input') input: UserUpdateUserCalendarInput,
  ) {
    return this.service.userUpdateUserCalendar(user.id, userCalendarId, input)
  }

  @Mutation(() => UserCalendar, { nullable: true })
  userDeleteUserCalendar(@CtxUser() user: User, @Args('userCalendarId') userCalendarId: string) {
    return this.service.userDeleteUserCalendar(user.id, userCalendarId)
  }
}

