
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCostCategoryInput,
  AdminListCostCategoryInput,
  AdminUpdateCostCategoryInput,
  ApiCostCategoryDataAccessAdminService,
  CostCategory
} from '@case-clinical/api/cost-category/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCostCategoryFeatureAdminResolver {
  constructor(private readonly service: ApiCostCategoryDataAccessAdminService) {}

  @Query(() => [CostCategory], { nullable: true })
  adminCostCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCostCategoryInput, nullable: true }) input?: AdminListCostCategoryInput,
  ) {
    return this.service.adminCostCategories(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCostCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCostCategoryInput, nullable: true }) input?: AdminListCostCategoryInput,
  ) {
    return this.service.adminCountCostCategories(admin.id, input)
  }





  @Query(() => CostCategory, { nullable: true })
  adminCostCategory(@CtxUser() admin: User, @Args('costCategoryId') costCategoryId: string) {
    return this.service.adminCostCategory(admin.id, costCategoryId)
  }

  @Mutation(() => CostCategory, { nullable: true })
  adminCreateCostCategory(@CtxUser() admin: User, @Args('input') input: AdminCreateCostCategoryInput,) {
    return this.service.adminCreateCostCategory(admin.id, input)
  }

  @Mutation(() => CostCategory, { nullable: true })
  adminUpdateCostCategory(
    @CtxUser() admin: User,
    @Args('costCategoryId') costCategoryId: string,
    @Args('input') input: AdminUpdateCostCategoryInput,
  ) {
    return this.service.adminUpdateCostCategory(admin.id, costCategoryId, input)
  }

  @Mutation(() => CostCategory, { nullable: true })
  adminDeleteCostCategory(@CtxUser() admin: User, @Args('costCategoryId') costCategoryId: string) {
    return this.service.adminDeleteCostCategory(admin.id, costCategoryId)
  }
}

