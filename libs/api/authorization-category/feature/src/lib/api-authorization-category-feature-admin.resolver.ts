
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAuthorizationCategoryInput,
  AdminListAuthorizationCategoryInput,
  AdminUpdateAuthorizationCategoryInput,
  ApiAuthorizationCategoryDataAccessAdminService,
  AuthorizationCategory
} from '@case-clinical/api/authorization-category/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAuthorizationCategoryFeatureAdminResolver {
  constructor(private readonly service: ApiAuthorizationCategoryDataAccessAdminService) {}

  @Query(() => [AuthorizationCategory], { nullable: true })
  adminAuthorizationCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationCategoryInput, nullable: true }) input?: AdminListAuthorizationCategoryInput,
  ) {
    return this.service.adminAuthorizationCategories(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAuthorizationCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationCategoryInput, nullable: true }) input?: AdminListAuthorizationCategoryInput,
  ) {
    return this.service.adminCountAuthorizationCategories(admin.id, input)
  }





  @Query(() => AuthorizationCategory, { nullable: true })
  adminAuthorizationCategory(@CtxUser() admin: User, @Args('authorizationCategoryId') authorizationCategoryId: string) {
    return this.service.adminAuthorizationCategory(admin.id, authorizationCategoryId)
  }

  @Mutation(() => AuthorizationCategory, { nullable: true })
  adminCreateAuthorizationCategory(@CtxUser() admin: User, @Args('input') input: AdminCreateAuthorizationCategoryInput,) {
    return this.service.adminCreateAuthorizationCategory(admin.id, input)
  }

  @Mutation(() => AuthorizationCategory, { nullable: true })
  adminUpdateAuthorizationCategory(
    @CtxUser() admin: User,
    @Args('authorizationCategoryId') authorizationCategoryId: string,
    @Args('input') input: AdminUpdateAuthorizationCategoryInput,
  ) {
    return this.service.adminUpdateAuthorizationCategory(admin.id, authorizationCategoryId, input)
  }

  @Mutation(() => AuthorizationCategory, { nullable: true })
  adminDeleteAuthorizationCategory(@CtxUser() admin: User, @Args('authorizationCategoryId') authorizationCategoryId: string) {
    return this.service.adminDeleteAuthorizationCategory(admin.id, authorizationCategoryId)
  }
}

