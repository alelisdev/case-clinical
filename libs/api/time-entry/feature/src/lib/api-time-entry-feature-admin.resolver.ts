
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTimeEntryInput,
  AdminListTimeEntryInput,
  AdminUpdateTimeEntryInput,
  ApiTimeEntryDataAccessAdminService,
  TimeEntry
} from '@case-clinical/api/time-entry/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTimeEntryFeatureAdminResolver {
  constructor(private readonly service: ApiTimeEntryDataAccessAdminService) {}

  @Query(() => [TimeEntry], { nullable: true })
  adminTimeEntries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTimeEntryInput, nullable: true }) input?: AdminListTimeEntryInput,
  ) {
    return this.service.adminTimeEntries(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTimeEntries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTimeEntryInput, nullable: true }) input?: AdminListTimeEntryInput,
  ) {
    return this.service.adminCountTimeEntries(admin.id, input)
  }





  @Query(() => TimeEntry, { nullable: true })
  adminTimeEntry(@CtxUser() admin: User, @Args('timeEntryId') timeEntryId: string) {
    return this.service.adminTimeEntry(admin.id, timeEntryId)
  }

  @Mutation(() => TimeEntry, { nullable: true })
  adminCreateTimeEntry(@CtxUser() admin: User, @Args('input') input: AdminCreateTimeEntryInput,) {
    return this.service.adminCreateTimeEntry(admin.id, input)
  }

  @Mutation(() => TimeEntry, { nullable: true })
  adminUpdateTimeEntry(
    @CtxUser() admin: User,
    @Args('timeEntryId') timeEntryId: string,
    @Args('input') input: AdminUpdateTimeEntryInput,
  ) {
    return this.service.adminUpdateTimeEntry(admin.id, timeEntryId, input)
  }

  @Mutation(() => TimeEntry, { nullable: true })
  adminDeleteTimeEntry(@CtxUser() admin: User, @Args('timeEntryId') timeEntryId: string) {
    return this.service.adminDeleteTimeEntry(admin.id, timeEntryId)
  }
}

