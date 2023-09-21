
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCostCategoryInput,
  UserListCostCategoryInput,
  UserUpdateCostCategoryInput,
  UserUpdateCostCategoriesInput,
  ApiCostCategoryDataAccessUserService,
  CostCategory,
} from '@case-clinical/api/cost-category/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCostCategoryFeatureUserResolver {
  constructor(private readonly service: ApiCostCategoryDataAccessUserService) {}

  @Query(() => [CostCategory], { nullable: true })
  userCostCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCostCategoryInput, nullable: true }) input?: UserListCostCategoryInput,
  ) {
    return this.service.userCostCategories(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCostCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCostCategoryInput, nullable: true }) input?: UserListCostCategoryInput,
  ) {
    return this.service.userCountCostCategories(user.id, input)
  }

  @Query(() => [CostCategory], { nullable: true })
  userSelectCostCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCostCategoryInput, nullable: true }) input?: UserListCostCategoryInput,
  ) {
    return this.service.userSelectCostCategories(user.id, input)
  }







  @Query(() => CostCategory, { nullable: true })
  userCostCategory(@CtxUser() user: User, @Args('costCategoryId') costCategoryId: string) {
    return this.service.userCostCategory(user.id, costCategoryId)
  }

  @Mutation(() => CostCategory, { nullable: true })
  userCreateCostCategory(@CtxUser() user: User, @Args('input') input: UserCreateCostCategoryInput,) {
    return this.service.userCreateCostCategory(user.id, input)
  }

  @Mutation(() => CostCategory, { nullable: true })
  userUpdateCostCategory(
    @CtxUser() user: User,
    @Args('costCategoryId') costCategoryId: string,
    @Args('input') input: UserUpdateCostCategoryInput,
  ) {
    return this.service.userUpdateCostCategory(user.id, costCategoryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCostCategories(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCostCategoriesInput,
  ) {
    return this.service.userUpdateCostCategories(user.id, input)
  }

  @Mutation(() => CostCategory, { nullable: true })
  userDeleteCostCategory(@CtxUser() user: User, @Args('costCategoryId') costCategoryId: string) {
    return this.service.userDeleteCostCategory(user.id, costCategoryId)
  }
}

