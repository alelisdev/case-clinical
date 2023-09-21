
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRecommendedOrderInput,
  ApiRecommendedOrderDataAccessPublicService,
  RecommendedOrder,
} from '@case-clinical/api/recommended-order/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRecommendedOrderFeaturePublicResolver {
  constructor(private readonly service: ApiRecommendedOrderDataAccessPublicService) {}
           
  @Query(() => [RecommendedOrder], { nullable: true })
  publicRecommendedOrders(
    @Args({ name: 'input', type: () => UserListRecommendedOrderInput, nullable: true }) input?: UserListRecommendedOrderInput,
  ) {
    return this.service.publicRecommendedOrders(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRecommendedOrders(
    @Args({ name: 'input', type: () => UserListRecommendedOrderInput, nullable: true }) input?: UserListRecommendedOrderInput,
  ) {
    return this.service.publicCountRecommendedOrders(input)
  }

  @Query(() => [RecommendedOrder], { nullable: true })
  publicSelectRecommendedOrders(
    @Args({ name: 'input', type: () => UserListRecommendedOrderInput, nullable: true }) input?: UserListRecommendedOrderInput,
  ) {
    return this.service.publicSelectRecommendedOrders(input)
  }

  @Query(() => RecommendedOrder, { nullable: true })
  publicRecommendedOrder(@Args('recommendedOrderId') recommendedOrderId: string) {
    return this.service.publicRecommendedOrder(recommendedOrderId)
  }
}
