
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateReviewInput,
  AdminListReviewInput,
  AdminUpdateReviewInput,
  ApiReviewDataAccessAdminService,
  Review
} from '@case-clinical/api/review/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiReviewFeatureAdminResolver {
  constructor(private readonly service: ApiReviewDataAccessAdminService) {}

  @Query(() => [Review], { nullable: true })
  adminReviews(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListReviewInput, nullable: true }) input?: AdminListReviewInput,
  ) {
    return this.service.adminReviews(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountReviews(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListReviewInput, nullable: true }) input?: AdminListReviewInput,
  ) {
    return this.service.adminCountReviews(admin.id, input)
  }





  @Query(() => Review, { nullable: true })
  adminReview(@CtxUser() admin: User, @Args('reviewId') reviewId: string) {
    return this.service.adminReview(admin.id, reviewId)
  }

  @Mutation(() => Review, { nullable: true })
  adminCreateReview(@CtxUser() admin: User, @Args('input') input: AdminCreateReviewInput,) {
    return this.service.adminCreateReview(admin.id, input)
  }

  @Mutation(() => Review, { nullable: true })
  adminUpdateReview(
    @CtxUser() admin: User,
    @Args('reviewId') reviewId: string,
    @Args('input') input: AdminUpdateReviewInput,
  ) {
    return this.service.adminUpdateReview(admin.id, reviewId, input)
  }

  @Mutation(() => Review, { nullable: true })
  adminDeleteReview(@CtxUser() admin: User, @Args('reviewId') reviewId: string) {
    return this.service.adminDeleteReview(admin.id, reviewId)
  }
}

