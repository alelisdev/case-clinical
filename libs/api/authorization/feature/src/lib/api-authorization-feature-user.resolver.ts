
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAuthorizationInput,
  UserListAuthorizationInput,
  UserUpdateAuthorizationInput,
  UserUpdateAuthorizationsInput,
  ApiAuthorizationDataAccessUserService,
  Authorization,
} from '@case-clinical/api/authorization/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { UserListAuthorizationCategoryInput, AuthorizationCategory } from '@case-clinical/api/authorization-category/data-access'
import { UserListAuthorizationTypeInput, AuthorizationType } from '@case-clinical/api/authorization-type/data-access'
import { UserListProcedureInput, Procedure } from '@case-clinical/api/procedure/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAuthorizationFeatureUserResolver {
  constructor(private readonly service: ApiAuthorizationDataAccessUserService) {}

  @Query(() => [Authorization], { nullable: true })
  userAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationInput, nullable: true }) input?: UserListAuthorizationInput,
  ) {
    return this.service.userAuthorizations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationInput, nullable: true }) input?: UserListAuthorizationInput,
  ) {
    return this.service.userCountAuthorizations(user.id, input)
  }

  @Query(() => [Authorization], { nullable: true })
  userSelectAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationInput, nullable: true }) input?: UserListAuthorizationInput,
  ) {
    return this.service.userSelectAuthorizations(user.id, input)
  }







  @Query(() => Authorization, { nullable: true })
  userAuthorization(@CtxUser() user: User, @Args('authorizationId') authorizationId: string) {
    return this.service.userAuthorization(user.id, authorizationId)
  }

  @Mutation(() => Authorization, { nullable: true })
  userCreateAuthorization(@CtxUser() user: User, @Args('input') input: UserCreateAuthorizationInput,) {
    return this.service.userCreateAuthorization(user.id, input)
  }

  @Mutation(() => Authorization, { nullable: true })
  userUpdateAuthorization(
    @CtxUser() user: User,
    @Args('authorizationId') authorizationId: string,
    @Args('input') input: UserUpdateAuthorizationInput,
  ) {
    return this.service.userUpdateAuthorization(user.id, authorizationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAuthorizations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAuthorizationsInput,
  ) {
    return this.service.userUpdateAuthorizations(user.id, input)
  }

  @Mutation(() => Authorization, { nullable: true })
  userDeleteAuthorization(@CtxUser() user: User, @Args('authorizationId') authorizationId: string) {
    return this.service.userDeleteAuthorization(user.id, authorizationId)
  }
}

