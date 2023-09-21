
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAuthorizationStatusInput,
  UserListAuthorizationStatusInput,
  UserUpdateAuthorizationStatusInput,
  UserUpdateAuthorizationStatusesInput,
  ApiAuthorizationStatusDataAccessUserService,
  AuthorizationStatus,
} from '@case-clinical/api/authorization-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAuthorizationStatusFeatureUserResolver {
  constructor(private readonly service: ApiAuthorizationStatusDataAccessUserService) {}

  @Query(() => [AuthorizationStatus], { nullable: true })
  userAuthorizationStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationStatusInput, nullable: true }) input?: UserListAuthorizationStatusInput,
  ) {
    return this.service.userAuthorizationStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAuthorizationStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationStatusInput, nullable: true }) input?: UserListAuthorizationStatusInput,
  ) {
    return this.service.userCountAuthorizationStatuses(user.id, input)
  }

  @Query(() => [AuthorizationStatus], { nullable: true })
  userSelectAuthorizationStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationStatusInput, nullable: true }) input?: UserListAuthorizationStatusInput,
  ) {
    return this.service.userSelectAuthorizationStatuses(user.id, input)
  }







  @Query(() => AuthorizationStatus, { nullable: true })
  userAuthorizationStatus(@CtxUser() user: User, @Args('authorizationStatusId') authorizationStatusId: string) {
    return this.service.userAuthorizationStatus(user.id, authorizationStatusId)
  }

  @Mutation(() => AuthorizationStatus, { nullable: true })
  userCreateAuthorizationStatus(@CtxUser() user: User, @Args('input') input: UserCreateAuthorizationStatusInput,) {
    return this.service.userCreateAuthorizationStatus(user.id, input)
  }

  @Mutation(() => AuthorizationStatus, { nullable: true })
  userUpdateAuthorizationStatus(
    @CtxUser() user: User,
    @Args('authorizationStatusId') authorizationStatusId: string,
    @Args('input') input: UserUpdateAuthorizationStatusInput,
  ) {
    return this.service.userUpdateAuthorizationStatus(user.id, authorizationStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAuthorizationStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAuthorizationStatusesInput,
  ) {
    return this.service.userUpdateAuthorizationStatuses(user.id, input)
  }

  @Mutation(() => AuthorizationStatus, { nullable: true })
  userDeleteAuthorizationStatus(@CtxUser() user: User, @Args('authorizationStatusId') authorizationStatusId: string) {
    return this.service.userDeleteAuthorizationStatus(user.id, authorizationStatusId)
  }
}

