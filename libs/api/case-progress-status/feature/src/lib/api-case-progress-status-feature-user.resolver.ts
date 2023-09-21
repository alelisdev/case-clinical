
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCaseProgressStatusInput,
  UserListCaseProgressStatusInput,
  UserUpdateCaseProgressStatusInput,
  UserUpdateCaseProgressStatusesInput,
  ApiCaseProgressStatusDataAccessUserService,
  CaseProgressStatus,
} from '@case-clinical/api/case-progress-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCaseProgressStatusFeatureUserResolver {
  constructor(private readonly service: ApiCaseProgressStatusDataAccessUserService) {}

  @Query(() => [CaseProgressStatus], { nullable: true })
  userCaseProgressStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseProgressStatusInput, nullable: true }) input?: UserListCaseProgressStatusInput,
  ) {
    return this.service.userCaseProgressStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCaseProgressStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseProgressStatusInput, nullable: true }) input?: UserListCaseProgressStatusInput,
  ) {
    return this.service.userCountCaseProgressStatuses(user.id, input)
  }

  @Query(() => [CaseProgressStatus], { nullable: true })
  userSelectCaseProgressStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseProgressStatusInput, nullable: true }) input?: UserListCaseProgressStatusInput,
  ) {
    return this.service.userSelectCaseProgressStatuses(user.id, input)
  }







  @Query(() => CaseProgressStatus, { nullable: true })
  userCaseProgressStatus(@CtxUser() user: User, @Args('caseProgressStatusId') caseProgressStatusId: string) {
    return this.service.userCaseProgressStatus(user.id, caseProgressStatusId)
  }

  @Mutation(() => CaseProgressStatus, { nullable: true })
  userCreateCaseProgressStatus(@CtxUser() user: User, @Args('input') input: UserCreateCaseProgressStatusInput,) {
    return this.service.userCreateCaseProgressStatus(user.id, input)
  }

  @Mutation(() => CaseProgressStatus, { nullable: true })
  userUpdateCaseProgressStatus(
    @CtxUser() user: User,
    @Args('caseProgressStatusId') caseProgressStatusId: string,
    @Args('input') input: UserUpdateCaseProgressStatusInput,
  ) {
    return this.service.userUpdateCaseProgressStatus(user.id, caseProgressStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCaseProgressStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCaseProgressStatusesInput,
  ) {
    return this.service.userUpdateCaseProgressStatuses(user.id, input)
  }

  @Mutation(() => CaseProgressStatus, { nullable: true })
  userDeleteCaseProgressStatus(@CtxUser() user: User, @Args('caseProgressStatusId') caseProgressStatusId: string) {
    return this.service.userDeleteCaseProgressStatus(user.id, caseProgressStatusId)
  }
}

