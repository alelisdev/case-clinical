
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListImplantCategoryInput,
  ApiImplantCategoryDataAccessPublicService,
  ImplantCategory,
} from '@case-clinical/api/implant-category/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiImplantCategoryFeaturePublicResolver {
  constructor(private readonly service: ApiImplantCategoryDataAccessPublicService) {}
           
  @Query(() => [ImplantCategory], { nullable: true })
  publicImplantCategories(
    @Args({ name: 'input', type: () => UserListImplantCategoryInput, nullable: true }) input?: UserListImplantCategoryInput,
  ) {
    return this.service.publicImplantCategories(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountImplantCategories(
    @Args({ name: 'input', type: () => UserListImplantCategoryInput, nullable: true }) input?: UserListImplantCategoryInput,
  ) {
    return this.service.publicCountImplantCategories(input)
  }

  @Query(() => [ImplantCategory], { nullable: true })
  publicSelectImplantCategories(
    @Args({ name: 'input', type: () => UserListImplantCategoryInput, nullable: true }) input?: UserListImplantCategoryInput,
  ) {
    return this.service.publicSelectImplantCategories(input)
  }

  @Query(() => ImplantCategory, { nullable: true })
  publicImplantCategory(@Args('implantCategoryId') implantCategoryId: string) {
    return this.service.publicImplantCategory(implantCategoryId)
  }
}
