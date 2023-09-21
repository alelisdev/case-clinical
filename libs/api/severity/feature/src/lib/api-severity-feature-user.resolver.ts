
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateSeverityInput,
  UserListSeverityInput,
  UserUpdateSeverityInput,
  UserUpdateSeveritiesInput,
  ApiSeverityDataAccessUserService,
  Severity,
} from '@case-clinical/api/severity/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiSeverityFeatureUserResolver {
  constructor(private readonly service: ApiSeverityDataAccessUserService) {}

  @Query(() => [Severity], { nullable: true })
  userSeverities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSeverityInput, nullable: true }) input?: UserListSeverityInput,
  ) {
    return this.service.userSeverities(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountSeverities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSeverityInput, nullable: true }) input?: UserListSeverityInput,
  ) {
    return this.service.userCountSeverities(user.id, input)
  }

  @Query(() => [Severity], { nullable: true })
  userSelectSeverities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSeverityInput, nullable: true }) input?: UserListSeverityInput,
  ) {
    return this.service.userSelectSeverities(user.id, input)
  }







  @Query(() => Severity, { nullable: true })
  userSeverity(@CtxUser() user: User, @Args('severityId') severityId: string) {
    return this.service.userSeverity(user.id, severityId)
  }

  @Mutation(() => Severity, { nullable: true })
  userCreateSeverity(@CtxUser() user: User, @Args('input') input: UserCreateSeverityInput,) {
    return this.service.userCreateSeverity(user.id, input)
  }

  @Mutation(() => Severity, { nullable: true })
  userUpdateSeverity(
    @CtxUser() user: User,
    @Args('severityId') severityId: string,
    @Args('input') input: UserUpdateSeverityInput,
  ) {
    return this.service.userUpdateSeverity(user.id, severityId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateSeverities(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateSeveritiesInput,
  ) {
    return this.service.userUpdateSeverities(user.id, input)
  }

  @Mutation(() => Severity, { nullable: true })
  userDeleteSeverity(@CtxUser() user: User, @Args('severityId') severityId: string) {
    return this.service.userDeleteSeverity(user.id, severityId)
  }
}

