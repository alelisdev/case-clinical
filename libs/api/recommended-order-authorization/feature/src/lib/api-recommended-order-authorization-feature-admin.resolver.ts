
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRecommendedOrderAuthorizationInput,
  AdminListRecommendedOrderAuthorizationInput,
  AdminUpdateRecommendedOrderAuthorizationInput,
  ApiRecommendedOrderAuthorizationDataAccessAdminService,
  RecommendedOrderAuthorization
} from '@case-clinical/api/recommended-order-authorization/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListAuthorizationInput, Authorization } from '@case-clinical/api/authorization/data-access'
import { AdminListRecommendedOrderInput, RecommendedOrder } from '@case-clinical/api/recommended-order/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRecommendedOrderAuthorizationFeatureAdminResolver {
  constructor(private readonly service: ApiRecommendedOrderAuthorizationDataAccessAdminService) {}

  @Query(() => [RecommendedOrderAuthorization], { nullable: true })
  adminRecommendedOrderAuthorizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRecommendedOrderAuthorizationInput, nullable: true }) input?: AdminListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.adminRecommendedOrderAuthorizations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRecommendedOrderAuthorizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRecommendedOrderAuthorizationInput, nullable: true }) input?: AdminListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.adminCountRecommendedOrderAuthorizations(admin.id, input)
  }





  @Query(() => RecommendedOrderAuthorization, { nullable: true })
  adminRecommendedOrderAuthorization(@CtxUser() admin: User, @Args('recommendedOrderAuthorizationId') recommendedOrderAuthorizationId: string) {
    return this.service.adminRecommendedOrderAuthorization(admin.id, recommendedOrderAuthorizationId)
  }

  @Mutation(() => RecommendedOrderAuthorization, { nullable: true })
  adminCreateRecommendedOrderAuthorization(@CtxUser() admin: User, @Args('input') input: AdminCreateRecommendedOrderAuthorizationInput,) {
    return this.service.adminCreateRecommendedOrderAuthorization(admin.id, input)
  }

  @Mutation(() => RecommendedOrderAuthorization, { nullable: true })
  adminUpdateRecommendedOrderAuthorization(
    @CtxUser() admin: User,
    @Args('recommendedOrderAuthorizationId') recommendedOrderAuthorizationId: string,
    @Args('input') input: AdminUpdateRecommendedOrderAuthorizationInput,
  ) {
    return this.service.adminUpdateRecommendedOrderAuthorization(admin.id, recommendedOrderAuthorizationId, input)
  }

  @Mutation(() => RecommendedOrderAuthorization, { nullable: true })
  adminDeleteRecommendedOrderAuthorization(@CtxUser() admin: User, @Args('recommendedOrderAuthorizationId') recommendedOrderAuthorizationId: string) {
    return this.service.adminDeleteRecommendedOrderAuthorization(admin.id, recommendedOrderAuthorizationId)
  }
}

