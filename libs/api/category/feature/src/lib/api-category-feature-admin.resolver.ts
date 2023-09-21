
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCategoryInput,
  AdminListCategoryInput,
  AdminUpdateCategoryInput,
  ApiCategoryDataAccessAdminService,
  Category
} from '@case-clinical/api/category/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCategoryFeatureAdminResolver {
  constructor(private readonly service: ApiCategoryDataAccessAdminService) {}

  @Query(() => [Category], { nullable: true })
  adminCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCategoryInput, nullable: true }) input?: AdminListCategoryInput,
  ) {
    return this.service.adminCategories(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCategoryInput, nullable: true }) input?: AdminListCategoryInput,
  ) {
    return this.service.adminCountCategories(admin.id, input)
  }





  @Query(() => Category, { nullable: true })
  adminCategory(@CtxUser() admin: User, @Args('categoryId') categoryId: string) {
    return this.service.adminCategory(admin.id, categoryId)
  }

  @Mutation(() => Category, { nullable: true })
  adminCreateCategory(@CtxUser() admin: User, @Args('input') input: AdminCreateCategoryInput,) {
    return this.service.adminCreateCategory(admin.id, input)
  }

  @Mutation(() => Category, { nullable: true })
  adminUpdateCategory(
    @CtxUser() admin: User,
    @Args('categoryId') categoryId: string,
    @Args('input') input: AdminUpdateCategoryInput,
  ) {
    return this.service.adminUpdateCategory(admin.id, categoryId, input)
  }

  @Mutation(() => Category, { nullable: true })
  adminDeleteCategory(@CtxUser() admin: User, @Args('categoryId') categoryId: string) {
    return this.service.adminDeleteCategory(admin.id, categoryId)
  }
}

