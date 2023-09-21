
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorAuthGuidelineInput,
  AdminListPriorAuthGuidelineInput,
  AdminUpdatePriorAuthGuidelineInput,
  ApiPriorAuthGuidelineDataAccessAdminService,
  PriorAuthGuideline
} from '@case-clinical/api/prior-auth-guideline/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListGuidelineInput, Guideline } from '@case-clinical/api/guideline/data-access'
import { AdminListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorAuthGuidelineFeatureAdminResolver {
  constructor(private readonly service: ApiPriorAuthGuidelineDataAccessAdminService) {}

  @Query(() => [PriorAuthGuideline], { nullable: true })
  adminPriorAuthGuidelines(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthGuidelineInput, nullable: true }) input?: AdminListPriorAuthGuidelineInput,
  ) {
    return this.service.adminPriorAuthGuidelines(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorAuthGuidelines(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthGuidelineInput, nullable: true }) input?: AdminListPriorAuthGuidelineInput,
  ) {
    return this.service.adminCountPriorAuthGuidelines(admin.id, input)
  }





  @Query(() => PriorAuthGuideline, { nullable: true })
  adminPriorAuthGuideline(@CtxUser() admin: User, @Args('priorAuthGuidelineId') priorAuthGuidelineId: string) {
    return this.service.adminPriorAuthGuideline(admin.id, priorAuthGuidelineId)
  }

  @Mutation(() => PriorAuthGuideline, { nullable: true })
  adminCreatePriorAuthGuideline(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorAuthGuidelineInput,) {
    return this.service.adminCreatePriorAuthGuideline(admin.id, input)
  }

  @Mutation(() => PriorAuthGuideline, { nullable: true })
  adminUpdatePriorAuthGuideline(
    @CtxUser() admin: User,
    @Args('priorAuthGuidelineId') priorAuthGuidelineId: string,
    @Args('input') input: AdminUpdatePriorAuthGuidelineInput,
  ) {
    return this.service.adminUpdatePriorAuthGuideline(admin.id, priorAuthGuidelineId, input)
  }

  @Mutation(() => PriorAuthGuideline, { nullable: true })
  adminDeletePriorAuthGuideline(@CtxUser() admin: User, @Args('priorAuthGuidelineId') priorAuthGuidelineId: string) {
    return this.service.adminDeletePriorAuthGuideline(admin.id, priorAuthGuidelineId)
  }
}

