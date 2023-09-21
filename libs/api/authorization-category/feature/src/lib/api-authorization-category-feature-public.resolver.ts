
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAuthorizationCategoryInput,
  ApiAuthorizationCategoryDataAccessPublicService,
  AuthorizationCategory,
} from '@case-clinical/api/authorization-category/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAuthorizationCategoryFeaturePublicResolver {
  constructor(private readonly service: ApiAuthorizationCategoryDataAccessPublicService) {}
           
  @Query(() => [AuthorizationCategory], { nullable: true })
  publicAuthorizationCategories(
    @Args({ name: 'input', type: () => UserListAuthorizationCategoryInput, nullable: true }) input?: UserListAuthorizationCategoryInput,
  ) {
    return this.service.publicAuthorizationCategories(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAuthorizationCategories(
    @Args({ name: 'input', type: () => UserListAuthorizationCategoryInput, nullable: true }) input?: UserListAuthorizationCategoryInput,
  ) {
    return this.service.publicCountAuthorizationCategories(input)
  }

  @Query(() => [AuthorizationCategory], { nullable: true })
  publicSelectAuthorizationCategories(
    @Args({ name: 'input', type: () => UserListAuthorizationCategoryInput, nullable: true }) input?: UserListAuthorizationCategoryInput,
  ) {
    return this.service.publicSelectAuthorizationCategories(input)
  }

  @Query(() => AuthorizationCategory, { nullable: true })
  publicAuthorizationCategory(@Args('authorizationCategoryId') authorizationCategoryId: string) {
    return this.service.publicAuthorizationCategory(authorizationCategoryId)
  }
}
