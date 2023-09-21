
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCategoryInput,
  UserListCategoryInput,
  UserUpdateCategoryInput,
  UserUpdateCategoriesInput,
  ApiCategoryDataAccessUserService,
  Category,
} from '@case-clinical/api/category/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCategoryFeatureUserResolver {
  constructor(private readonly service: ApiCategoryDataAccessUserService) {}

  @Query(() => [Category], { nullable: true })
  userCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCategoryInput, nullable: true }) input?: UserListCategoryInput,
  ) {
    return this.service.userCategories(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCategoryInput, nullable: true }) input?: UserListCategoryInput,
  ) {
    return this.service.userCountCategories(user.id, input)
  }

  @Query(() => [Category], { nullable: true })
  userSelectCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCategoryInput, nullable: true }) input?: UserListCategoryInput,
  ) {
    return this.service.userSelectCategories(user.id, input)
  }







  @Query(() => Category, { nullable: true })
  userCategory(@CtxUser() user: User, @Args('categoryId') categoryId: string) {
    return this.service.userCategory(user.id, categoryId)
  }

  @Mutation(() => Category, { nullable: true })
  userCreateCategory(@CtxUser() user: User, @Args('input') input: UserCreateCategoryInput,) {
    return this.service.userCreateCategory(user.id, input)
  }

  @Mutation(() => Category, { nullable: true })
  userUpdateCategory(
    @CtxUser() user: User,
    @Args('categoryId') categoryId: string,
    @Args('input') input: UserUpdateCategoryInput,
  ) {
    return this.service.userUpdateCategory(user.id, categoryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCategories(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCategoriesInput,
  ) {
    return this.service.userUpdateCategories(user.id, input)
  }

  @Mutation(() => Category, { nullable: true })
  userDeleteCategory(@CtxUser() user: User, @Args('categoryId') categoryId: string) {
    return this.service.userDeleteCategory(user.id, categoryId)
  }
}

