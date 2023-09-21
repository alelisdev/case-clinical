
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTimeEntryInput,
  UserListTimeEntryInput,
  UserUpdateTimeEntryInput,
  ApiTimeEntryDataAccessUserService,
  TimeEntry,
} from '@case-clinical/api/time-entry/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTimeEntryFeatureUserResolver {
  constructor(private readonly service: ApiTimeEntryDataAccessUserService) {}

  @Query(() => [TimeEntry], { nullable: true })
  userTimeEntries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTimeEntryInput, nullable: true }) input?: UserListTimeEntryInput,
  ) {
    return this.service.userTimeEntries(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTimeEntries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTimeEntryInput, nullable: true }) input?: UserListTimeEntryInput,
  ) {
    return this.service.userCountTimeEntries(user.id, input)
  }






  @Query(() => TimeEntry, { nullable: true })
  userTimeEntry(@CtxUser() user: User, @Args('timeEntryId') timeEntryId: string) {
    return this.service.userTimeEntry(user.id, timeEntryId)
  }

  @Mutation(() => TimeEntry, { nullable: true })
  userCreateTimeEntry(@CtxUser() user: User, @Args('input') input: UserCreateTimeEntryInput,) {
    return this.service.userCreateTimeEntry(user.id, input)
  }

  @Mutation(() => TimeEntry, { nullable: true })
  userUpdateTimeEntry(
    @CtxUser() user: User,
    @Args('timeEntryId') timeEntryId: string,
    @Args('input') input: UserUpdateTimeEntryInput,
  ) {
    return this.service.userUpdateTimeEntry(user.id, timeEntryId, input)
  }

  @Mutation(() => TimeEntry, { nullable: true })
  userDeleteTimeEntry(@CtxUser() user: User, @Args('timeEntryId') timeEntryId: string) {
    return this.service.userDeleteTimeEntry(user.id, timeEntryId)
  }
}

