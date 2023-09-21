
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateImplantCategoryInput,
  AdminListImplantCategoryInput,
  AdminUpdateImplantCategoryInput,
  ApiImplantCategoryDataAccessAdminService,
  ImplantCategory
} from '@case-clinical/api/implant-category/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiImplantCategoryFeatureAdminResolver {
  constructor(private readonly service: ApiImplantCategoryDataAccessAdminService) {}

  @Query(() => [ImplantCategory], { nullable: true })
  adminImplantCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListImplantCategoryInput, nullable: true }) input?: AdminListImplantCategoryInput,
  ) {
    return this.service.adminImplantCategories(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountImplantCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListImplantCategoryInput, nullable: true }) input?: AdminListImplantCategoryInput,
  ) {
    return this.service.adminCountImplantCategories(admin.id, input)
  }





  @Query(() => ImplantCategory, { nullable: true })
  adminImplantCategory(@CtxUser() admin: User, @Args('implantCategoryId') implantCategoryId: string) {
    return this.service.adminImplantCategory(admin.id, implantCategoryId)
  }

  @Mutation(() => ImplantCategory, { nullable: true })
  adminCreateImplantCategory(@CtxUser() admin: User, @Args('input') input: AdminCreateImplantCategoryInput,) {
    return this.service.adminCreateImplantCategory(admin.id, input)
  }

  @Mutation(() => ImplantCategory, { nullable: true })
  adminUpdateImplantCategory(
    @CtxUser() admin: User,
    @Args('implantCategoryId') implantCategoryId: string,
    @Args('input') input: AdminUpdateImplantCategoryInput,
  ) {
    return this.service.adminUpdateImplantCategory(admin.id, implantCategoryId, input)
  }

  @Mutation(() => ImplantCategory, { nullable: true })
  adminDeleteImplantCategory(@CtxUser() admin: User, @Args('implantCategoryId') implantCategoryId: string) {
    return this.service.adminDeleteImplantCategory(admin.id, implantCategoryId)
  }
}

