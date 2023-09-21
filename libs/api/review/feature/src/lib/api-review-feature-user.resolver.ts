
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateReviewInput,
  UserListReviewInput,
  UserUpdateReviewInput,
  UserUpdateReviewsInput,
  ApiReviewDataAccessUserService,
  Review,
} from '@case-clinical/api/review/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiReviewFeatureUserResolver {
  constructor(private readonly service: ApiReviewDataAccessUserService) {}

  @Query(() => [Review], { nullable: true })
  userReviews(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReviewInput, nullable: true }) input?: UserListReviewInput,
  ) {
    return this.service.userReviews(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountReviews(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReviewInput, nullable: true }) input?: UserListReviewInput,
  ) {
    return this.service.userCountReviews(user.id, input)
  }

  @Query(() => [Review], { nullable: true })
  userSelectReviews(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReviewInput, nullable: true }) input?: UserListReviewInput,
  ) {
    return this.service.userSelectReviews(user.id, input)
  }







  @Query(() => Review, { nullable: true })
  userReview(@CtxUser() user: User, @Args('reviewId') reviewId: string) {
    return this.service.userReview(user.id, reviewId)
  }

  @Mutation(() => Review, { nullable: true })
  userCreateReview(@CtxUser() user: User, @Args('input') input: UserCreateReviewInput,) {
    return this.service.userCreateReview(user.id, input)
  }

  @Mutation(() => Review, { nullable: true })
  userUpdateReview(
    @CtxUser() user: User,
    @Args('reviewId') reviewId: string,
    @Args('input') input: UserUpdateReviewInput,
  ) {
    return this.service.userUpdateReview(user.id, reviewId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateReviews(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateReviewsInput,
  ) {
    return this.service.userUpdateReviews(user.id, input)
  }

  @Mutation(() => Review, { nullable: true })
  userDeleteReview(@CtxUser() user: User, @Args('reviewId') reviewId: string) {
    return this.service.userDeleteReview(user.id, reviewId)
  }
}

