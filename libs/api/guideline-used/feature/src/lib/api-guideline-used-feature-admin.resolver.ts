
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateGuidelineUsedInput,
  AdminListGuidelineUsedInput,
  AdminUpdateGuidelineUsedInput,
  ApiGuidelineUsedDataAccessAdminService,
  GuidelineUsed
} from '@case-clinical/api/guideline-used/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiGuidelineUsedFeatureAdminResolver {
  constructor(private readonly service: ApiGuidelineUsedDataAccessAdminService) {}

  @Query(() => [GuidelineUsed], { nullable: true })
  adminGuidelineUseds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListGuidelineUsedInput, nullable: true }) input?: AdminListGuidelineUsedInput,
  ) {
    return this.service.adminGuidelineUseds(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountGuidelineUseds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListGuidelineUsedInput, nullable: true }) input?: AdminListGuidelineUsedInput,
  ) {
    return this.service.adminCountGuidelineUseds(admin.id, input)
  }





  @Query(() => GuidelineUsed, { nullable: true })
  adminGuidelineUsed(@CtxUser() admin: User, @Args('guidelineUsedId') guidelineUsedId: string) {
    return this.service.adminGuidelineUsed(admin.id, guidelineUsedId)
  }

  @Mutation(() => GuidelineUsed, { nullable: true })
  adminCreateGuidelineUsed(@CtxUser() admin: User, @Args('input') input: AdminCreateGuidelineUsedInput,) {
    return this.service.adminCreateGuidelineUsed(admin.id, input)
  }

  @Mutation(() => GuidelineUsed, { nullable: true })
  adminUpdateGuidelineUsed(
    @CtxUser() admin: User,
    @Args('guidelineUsedId') guidelineUsedId: string,
    @Args('input') input: AdminUpdateGuidelineUsedInput,
  ) {
    return this.service.adminUpdateGuidelineUsed(admin.id, guidelineUsedId, input)
  }

  @Mutation(() => GuidelineUsed, { nullable: true })
  adminDeleteGuidelineUsed(@CtxUser() admin: User, @Args('guidelineUsedId') guidelineUsedId: string) {
    return this.service.adminDeleteGuidelineUsed(admin.id, guidelineUsedId)
  }
}

