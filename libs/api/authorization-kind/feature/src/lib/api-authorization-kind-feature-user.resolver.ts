
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAuthorizationKindInput,
  UserListAuthorizationKindInput,
  UserUpdateAuthorizationKindInput,
  UserUpdateAuthorizationKindsInput,
  ApiAuthorizationKindDataAccessUserService,
  AuthorizationKind,
} from '@case-clinical/api/authorization-kind/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListCategoryInput, Category } from '@case-clinical/api/category/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAuthorizationKindFeatureUserResolver {
  constructor(private readonly service: ApiAuthorizationKindDataAccessUserService) {}

  @Query(() => [AuthorizationKind], { nullable: true })
  userAuthorizationKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationKindInput, nullable: true }) input?: UserListAuthorizationKindInput,
  ) {
    return this.service.userAuthorizationKinds(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAuthorizationKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationKindInput, nullable: true }) input?: UserListAuthorizationKindInput,
  ) {
    return this.service.userCountAuthorizationKinds(user.id, input)
  }

  @Query(() => [AuthorizationKind], { nullable: true })
  userSelectAuthorizationKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationKindInput, nullable: true }) input?: UserListAuthorizationKindInput,
  ) {
    return this.service.userSelectAuthorizationKinds(user.id, input)
  }







  @Query(() => AuthorizationKind, { nullable: true })
  userAuthorizationKind(@CtxUser() user: User, @Args('authorizationKindId') authorizationKindId: string) {
    return this.service.userAuthorizationKind(user.id, authorizationKindId)
  }

  @Mutation(() => AuthorizationKind, { nullable: true })
  userCreateAuthorizationKind(@CtxUser() user: User, @Args('input') input: UserCreateAuthorizationKindInput,) {
    return this.service.userCreateAuthorizationKind(user.id, input)
  }

  @Mutation(() => AuthorizationKind, { nullable: true })
  userUpdateAuthorizationKind(
    @CtxUser() user: User,
    @Args('authorizationKindId') authorizationKindId: string,
    @Args('input') input: UserUpdateAuthorizationKindInput,
  ) {
    return this.service.userUpdateAuthorizationKind(user.id, authorizationKindId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAuthorizationKinds(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAuthorizationKindsInput,
  ) {
    return this.service.userUpdateAuthorizationKinds(user.id, input)
  }

  @Mutation(() => AuthorizationKind, { nullable: true })
  userDeleteAuthorizationKind(@CtxUser() user: User, @Args('authorizationKindId') authorizationKindId: string) {
    return this.service.userDeleteAuthorizationKind(user.id, authorizationKindId)
  }
}

