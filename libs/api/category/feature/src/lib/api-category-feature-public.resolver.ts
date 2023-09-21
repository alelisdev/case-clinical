
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCategoryInput,
  ApiCategoryDataAccessPublicService,
  Category,
} from '@case-clinical/api/category/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCategoryFeaturePublicResolver {
  constructor(private readonly service: ApiCategoryDataAccessPublicService) {}
           
  @Query(() => [Category], { nullable: true })
  publicCategories(
    @Args({ name: 'input', type: () => UserListCategoryInput, nullable: true }) input?: UserListCategoryInput,
  ) {
    return this.service.publicCategories(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCategories(
    @Args({ name: 'input', type: () => UserListCategoryInput, nullable: true }) input?: UserListCategoryInput,
  ) {
    return this.service.publicCountCategories(input)
  }

  @Query(() => [Category], { nullable: true })
  publicSelectCategories(
    @Args({ name: 'input', type: () => UserListCategoryInput, nullable: true }) input?: UserListCategoryInput,
  ) {
    return this.service.publicSelectCategories(input)
  }

  @Query(() => Category, { nullable: true })
  publicCategory(@Args('categoryId') categoryId: string) {
    return this.service.publicCategory(categoryId)
  }
}
