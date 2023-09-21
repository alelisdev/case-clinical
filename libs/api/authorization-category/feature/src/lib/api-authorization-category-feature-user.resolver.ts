
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAuthorizationCategoryInput,
  UserListAuthorizationCategoryInput,
  UserUpdateAuthorizationCategoryInput,
  UserUpdateAuthorizationCategoriesInput,
  ApiAuthorizationCategoryDataAccessUserService,
  AuthorizationCategory,
} from '@case-clinical/api/authorization-category/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAuthorizationCategoryFeatureUserResolver {
  constructor(private readonly service: ApiAuthorizationCategoryDataAccessUserService) {}

  @Query(() => [AuthorizationCategory], { nullable: true })
  userAuthorizationCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationCategoryInput, nullable: true }) input?: UserListAuthorizationCategoryInput,
  ) {
    return this.service.userAuthorizationCategories(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAuthorizationCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationCategoryInput, nullable: true }) input?: UserListAuthorizationCategoryInput,
  ) {
    return this.service.userCountAuthorizationCategories(user.id, input)
  }

  @Query(() => [AuthorizationCategory], { nullable: true })
  userSelectAuthorizationCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationCategoryInput, nullable: true }) input?: UserListAuthorizationCategoryInput,
  ) {
    return this.service.userSelectAuthorizationCategories(user.id, input)
  }







  @Query(() => AuthorizationCategory, { nullable: true })
  userAuthorizationCategory(@CtxUser() user: User, @Args('authorizationCategoryId') authorizationCategoryId: string) {
    return this.service.userAuthorizationCategory(user.id, authorizationCategoryId)
  }

  @Mutation(() => AuthorizationCategory, { nullable: true })
  userCreateAuthorizationCategory(@CtxUser() user: User, @Args('input') input: UserCreateAuthorizationCategoryInput,) {
    return this.service.userCreateAuthorizationCategory(user.id, input)
  }

  @Mutation(() => AuthorizationCategory, { nullable: true })
  userUpdateAuthorizationCategory(
    @CtxUser() user: User,
    @Args('authorizationCategoryId') authorizationCategoryId: string,
    @Args('input') input: UserUpdateAuthorizationCategoryInput,
  ) {
    return this.service.userUpdateAuthorizationCategory(user.id, authorizationCategoryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAuthorizationCategories(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAuthorizationCategoriesInput,
  ) {
    return this.service.userUpdateAuthorizationCategories(user.id, input)
  }

  @Mutation(() => AuthorizationCategory, { nullable: true })
  userDeleteAuthorizationCategory(@CtxUser() user: User, @Args('authorizationCategoryId') authorizationCategoryId: string) {
    return this.service.userDeleteAuthorizationCategory(user.id, authorizationCategoryId)
  }
}

