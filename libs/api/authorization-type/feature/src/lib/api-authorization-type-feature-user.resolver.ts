
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAuthorizationTypeInput,
  UserListAuthorizationTypeInput,
  UserUpdateAuthorizationTypeInput,
  UserUpdateAuthorizationTypesInput,
  ApiAuthorizationTypeDataAccessUserService,
  AuthorizationType,
} from '@case-clinical/api/authorization-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAuthorizationTypeFeatureUserResolver {
  constructor(private readonly service: ApiAuthorizationTypeDataAccessUserService) {}

  @Query(() => [AuthorizationType], { nullable: true })
  userAuthorizationTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationTypeInput, nullable: true }) input?: UserListAuthorizationTypeInput,
  ) {
    return this.service.userAuthorizationTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAuthorizationTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationTypeInput, nullable: true }) input?: UserListAuthorizationTypeInput,
  ) {
    return this.service.userCountAuthorizationTypes(user.id, input)
  }

  @Query(() => [AuthorizationType], { nullable: true })
  userSelectAuthorizationTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationTypeInput, nullable: true }) input?: UserListAuthorizationTypeInput,
  ) {
    return this.service.userSelectAuthorizationTypes(user.id, input)
  }







  @Query(() => AuthorizationType, { nullable: true })
  userAuthorizationType(@CtxUser() user: User, @Args('authorizationTypeId') authorizationTypeId: string) {
    return this.service.userAuthorizationType(user.id, authorizationTypeId)
  }

  @Mutation(() => AuthorizationType, { nullable: true })
  userCreateAuthorizationType(@CtxUser() user: User, @Args('input') input: UserCreateAuthorizationTypeInput,) {
    return this.service.userCreateAuthorizationType(user.id, input)
  }

  @Mutation(() => AuthorizationType, { nullable: true })
  userUpdateAuthorizationType(
    @CtxUser() user: User,
    @Args('authorizationTypeId') authorizationTypeId: string,
    @Args('input') input: UserUpdateAuthorizationTypeInput,
  ) {
    return this.service.userUpdateAuthorizationType(user.id, authorizationTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAuthorizationTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAuthorizationTypesInput,
  ) {
    return this.service.userUpdateAuthorizationTypes(user.id, input)
  }

  @Mutation(() => AuthorizationType, { nullable: true })
  userDeleteAuthorizationType(@CtxUser() user: User, @Args('authorizationTypeId') authorizationTypeId: string) {
    return this.service.userDeleteAuthorizationType(user.id, authorizationTypeId)
  }
}

