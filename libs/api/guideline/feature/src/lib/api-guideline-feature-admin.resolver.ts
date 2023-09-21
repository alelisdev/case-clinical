
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateGuidelineInput,
  AdminListGuidelineInput,
  AdminUpdateGuidelineInput,
  ApiGuidelineDataAccessAdminService,
  Guideline
} from '@case-clinical/api/guideline/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiGuidelineFeatureAdminResolver {
  constructor(private readonly service: ApiGuidelineDataAccessAdminService) {}

  @Query(() => [Guideline], { nullable: true })
  adminGuidelines(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListGuidelineInput, nullable: true }) input?: AdminListGuidelineInput,
  ) {
    return this.service.adminGuidelines(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountGuidelines(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListGuidelineInput, nullable: true }) input?: AdminListGuidelineInput,
  ) {
    return this.service.adminCountGuidelines(admin.id, input)
  }





  @Query(() => Guideline, { nullable: true })
  adminGuideline(@CtxUser() admin: User, @Args('guidelineId') guidelineId: string) {
    return this.service.adminGuideline(admin.id, guidelineId)
  }

  @Mutation(() => Guideline, { nullable: true })
  adminCreateGuideline(@CtxUser() admin: User, @Args('input') input: AdminCreateGuidelineInput,) {
    return this.service.adminCreateGuideline(admin.id, input)
  }

  @Mutation(() => Guideline, { nullable: true })
  adminUpdateGuideline(
    @CtxUser() admin: User,
    @Args('guidelineId') guidelineId: string,
    @Args('input') input: AdminUpdateGuidelineInput,
  ) {
    return this.service.adminUpdateGuideline(admin.id, guidelineId, input)
  }

  @Mutation(() => Guideline, { nullable: true })
  adminDeleteGuideline(@CtxUser() admin: User, @Args('guidelineId') guidelineId: string) {
    return this.service.adminDeleteGuideline(admin.id, guidelineId)
  }
}

