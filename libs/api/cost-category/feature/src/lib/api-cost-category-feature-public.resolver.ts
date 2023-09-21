
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCostCategoryInput,
  ApiCostCategoryDataAccessPublicService,
  CostCategory,
} from '@case-clinical/api/cost-category/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCostCategoryFeaturePublicResolver {
  constructor(private readonly service: ApiCostCategoryDataAccessPublicService) {}
           
  @Query(() => [CostCategory], { nullable: true })
  publicCostCategories(
    @Args({ name: 'input', type: () => UserListCostCategoryInput, nullable: true }) input?: UserListCostCategoryInput,
  ) {
    return this.service.publicCostCategories(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCostCategories(
    @Args({ name: 'input', type: () => UserListCostCategoryInput, nullable: true }) input?: UserListCostCategoryInput,
  ) {
    return this.service.publicCountCostCategories(input)
  }

  @Query(() => [CostCategory], { nullable: true })
  publicSelectCostCategories(
    @Args({ name: 'input', type: () => UserListCostCategoryInput, nullable: true }) input?: UserListCostCategoryInput,
  ) {
    return this.service.publicSelectCostCategories(input)
  }

  @Query(() => CostCategory, { nullable: true })
  publicCostCategory(@Args('costCategoryId') costCategoryId: string) {
    return this.service.publicCostCategory(costCategoryId)
  }
}
