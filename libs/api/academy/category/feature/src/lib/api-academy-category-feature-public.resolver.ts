
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAcademyCategoryInput,
  ApiAcademyCategoryDataAccessPublicService,
  AcademyCategory,
} from '@case-clinical/api/academy/category/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAcademyCategoryFeaturePublicResolver {
  constructor(private readonly service: ApiAcademyCategoryDataAccessPublicService) {}
           
  @Query(() => [AcademyCategory], { nullable: true })
  publicAcademyCategories(
    @Args({ name: 'input', type: () => UserListAcademyCategoryInput, nullable: true }) input?: UserListAcademyCategoryInput,
  ) {
    return this.service.publicAcademyCategories(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAcademyCategories(
    @Args({ name: 'input', type: () => UserListAcademyCategoryInput, nullable: true }) input?: UserListAcademyCategoryInput,
  ) {
    return this.service.publicCountAcademyCategories(input)
  }

  @Query(() => [AcademyCategory], { nullable: true })
  publicSelectAcademyCategories(
    @Args({ name: 'input', type: () => UserListAcademyCategoryInput, nullable: true }) input?: UserListAcademyCategoryInput,
  ) {
    return this.service.publicSelectAcademyCategories(input)
  }

  @Query(() => AcademyCategory, { nullable: true })
  publicAcademyCategory(@Args('academyCategoryId') academyCategoryId: string) {
    return this.service.publicAcademyCategory(academyCategoryId)
  }
}
