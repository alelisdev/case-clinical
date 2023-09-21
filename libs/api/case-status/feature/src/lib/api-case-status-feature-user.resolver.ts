
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCaseStatusInput,
  UserListCaseStatusInput,
  UserUpdateCaseStatusInput,
  UserUpdateCaseStatusesInput,
  ApiCaseStatusDataAccessUserService,
  CaseStatus,
} from '@case-clinical/api/case-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCaseStatusFeatureUserResolver {
  constructor(private readonly service: ApiCaseStatusDataAccessUserService) {}

  @Query(() => [CaseStatus], { nullable: true })
  userCaseStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseStatusInput, nullable: true }) input?: UserListCaseStatusInput,
  ) {
    return this.service.userCaseStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCaseStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseStatusInput, nullable: true }) input?: UserListCaseStatusInput,
  ) {
    return this.service.userCountCaseStatuses(user.id, input)
  }

  @Query(() => [CaseStatus], { nullable: true })
  userSelectCaseStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseStatusInput, nullable: true }) input?: UserListCaseStatusInput,
  ) {
    return this.service.userSelectCaseStatuses(user.id, input)
  }







  @Query(() => CaseStatus, { nullable: true })
  userCaseStatus(@CtxUser() user: User, @Args('caseStatusId') caseStatusId: string) {
    return this.service.userCaseStatus(user.id, caseStatusId)
  }

  @Mutation(() => CaseStatus, { nullable: true })
  userCreateCaseStatus(@CtxUser() user: User, @Args('input') input: UserCreateCaseStatusInput,) {
    return this.service.userCreateCaseStatus(user.id, input)
  }

  @Mutation(() => CaseStatus, { nullable: true })
  userUpdateCaseStatus(
    @CtxUser() user: User,
    @Args('caseStatusId') caseStatusId: string,
    @Args('input') input: UserUpdateCaseStatusInput,
  ) {
    return this.service.userUpdateCaseStatus(user.id, caseStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCaseStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCaseStatusesInput,
  ) {
    return this.service.userUpdateCaseStatuses(user.id, input)
  }

  @Mutation(() => CaseStatus, { nullable: true })
  userDeleteCaseStatus(@CtxUser() user: User, @Args('caseStatusId') caseStatusId: string) {
    return this.service.userDeleteCaseStatus(user.id, caseStatusId)
  }
}

