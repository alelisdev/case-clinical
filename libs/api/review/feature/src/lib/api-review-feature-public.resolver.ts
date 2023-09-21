
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListReviewInput,
  ApiReviewDataAccessPublicService,
  Review,
} from '@case-clinical/api/review/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiReviewFeaturePublicResolver {
  constructor(private readonly service: ApiReviewDataAccessPublicService) {}
           
  @Query(() => [Review], { nullable: true })
  publicReviews(
    @Args({ name: 'input', type: () => UserListReviewInput, nullable: true }) input?: UserListReviewInput,
  ) {
    return this.service.publicReviews(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountReviews(
    @Args({ name: 'input', type: () => UserListReviewInput, nullable: true }) input?: UserListReviewInput,
  ) {
    return this.service.publicCountReviews(input)
  }

  @Query(() => [Review], { nullable: true })
  publicSelectReviews(
    @Args({ name: 'input', type: () => UserListReviewInput, nullable: true }) input?: UserListReviewInput,
  ) {
    return this.service.publicSelectReviews(input)
  }

  @Query(() => Review, { nullable: true })
  publicReview(@Args('reviewId') reviewId: string) {
    return this.service.publicReview(reviewId)
  }
}
