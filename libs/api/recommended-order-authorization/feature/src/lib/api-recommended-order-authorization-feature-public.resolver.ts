
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRecommendedOrderAuthorizationInput,
  ApiRecommendedOrderAuthorizationDataAccessPublicService,
  RecommendedOrderAuthorization,
} from '@case-clinical/api/recommended-order-authorization/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRecommendedOrderAuthorizationFeaturePublicResolver {
  constructor(private readonly service: ApiRecommendedOrderAuthorizationDataAccessPublicService) {}
           
  @Query(() => [RecommendedOrderAuthorization], { nullable: true })
  publicRecommendedOrderAuthorizations(
    @Args({ name: 'input', type: () => UserListRecommendedOrderAuthorizationInput, nullable: true }) input?: UserListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.publicRecommendedOrderAuthorizations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRecommendedOrderAuthorizations(
    @Args({ name: 'input', type: () => UserListRecommendedOrderAuthorizationInput, nullable: true }) input?: UserListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.publicCountRecommendedOrderAuthorizations(input)
  }

  @Query(() => [RecommendedOrderAuthorization], { nullable: true })
  publicSelectRecommendedOrderAuthorizations(
    @Args({ name: 'input', type: () => UserListRecommendedOrderAuthorizationInput, nullable: true }) input?: UserListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.publicSelectRecommendedOrderAuthorizations(input)
  }

  @Query(() => RecommendedOrderAuthorization, { nullable: true })
  publicRecommendedOrderAuthorization(@Args('recommendedOrderAuthorizationId') recommendedOrderAuthorizationId: string) {
    return this.service.publicRecommendedOrderAuthorization(recommendedOrderAuthorizationId)
  }
}
