
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateImplantCategoryInput,
  UserListImplantCategoryInput,
  UserUpdateImplantCategoryInput,
  UserUpdateImplantCategoriesInput,
  ApiImplantCategoryDataAccessUserService,
  ImplantCategory,
} from '@case-clinical/api/implant-category/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiImplantCategoryFeatureUserResolver {
  constructor(private readonly service: ApiImplantCategoryDataAccessUserService) {}

  @Query(() => [ImplantCategory], { nullable: true })
  userImplantCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListImplantCategoryInput, nullable: true }) input?: UserListImplantCategoryInput,
  ) {
    return this.service.userImplantCategories(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountImplantCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListImplantCategoryInput, nullable: true }) input?: UserListImplantCategoryInput,
  ) {
    return this.service.userCountImplantCategories(user.id, input)
  }

  @Query(() => [ImplantCategory], { nullable: true })
  userSelectImplantCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListImplantCategoryInput, nullable: true }) input?: UserListImplantCategoryInput,
  ) {
    return this.service.userSelectImplantCategories(user.id, input)
  }







  @Query(() => ImplantCategory, { nullable: true })
  userImplantCategory(@CtxUser() user: User, @Args('implantCategoryId') implantCategoryId: string) {
    return this.service.userImplantCategory(user.id, implantCategoryId)
  }

  @Mutation(() => ImplantCategory, { nullable: true })
  userCreateImplantCategory(@CtxUser() user: User, @Args('input') input: UserCreateImplantCategoryInput,) {
    return this.service.userCreateImplantCategory(user.id, input)
  }

  @Mutation(() => ImplantCategory, { nullable: true })
  userUpdateImplantCategory(
    @CtxUser() user: User,
    @Args('implantCategoryId') implantCategoryId: string,
    @Args('input') input: UserUpdateImplantCategoryInput,
  ) {
    return this.service.userUpdateImplantCategory(user.id, implantCategoryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateImplantCategories(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateImplantCategoriesInput,
  ) {
    return this.service.userUpdateImplantCategories(user.id, input)
  }

  @Mutation(() => ImplantCategory, { nullable: true })
  userDeleteImplantCategory(@CtxUser() user: User, @Args('implantCategoryId') implantCategoryId: string) {
    return this.service.userDeleteImplantCategory(user.id, implantCategoryId)
  }
}

