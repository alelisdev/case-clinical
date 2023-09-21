
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRecommendedOrderInput,
  AdminListRecommendedOrderInput,
  AdminUpdateRecommendedOrderInput,
  ApiRecommendedOrderDataAccessAdminService,
  RecommendedOrder
} from '@case-clinical/api/recommended-order/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRecommendedOrderFeatureAdminResolver {
  constructor(private readonly service: ApiRecommendedOrderDataAccessAdminService) {}

  @Query(() => [RecommendedOrder], { nullable: true })
  adminRecommendedOrders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRecommendedOrderInput, nullable: true }) input?: AdminListRecommendedOrderInput,
  ) {
    return this.service.adminRecommendedOrders(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRecommendedOrders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRecommendedOrderInput, nullable: true }) input?: AdminListRecommendedOrderInput,
  ) {
    return this.service.adminCountRecommendedOrders(admin.id, input)
  }





  @Query(() => RecommendedOrder, { nullable: true })
  adminRecommendedOrder(@CtxUser() admin: User, @Args('recommendedOrderId') recommendedOrderId: string) {
    return this.service.adminRecommendedOrder(admin.id, recommendedOrderId)
  }

  @Mutation(() => RecommendedOrder, { nullable: true })
  adminCreateRecommendedOrder(@CtxUser() admin: User, @Args('input') input: AdminCreateRecommendedOrderInput,) {
    return this.service.adminCreateRecommendedOrder(admin.id, input)
  }

  @Mutation(() => RecommendedOrder, { nullable: true })
  adminUpdateRecommendedOrder(
    @CtxUser() admin: User,
    @Args('recommendedOrderId') recommendedOrderId: string,
    @Args('input') input: AdminUpdateRecommendedOrderInput,
  ) {
    return this.service.adminUpdateRecommendedOrder(admin.id, recommendedOrderId, input)
  }

  @Mutation(() => RecommendedOrder, { nullable: true })
  adminDeleteRecommendedOrder(@CtxUser() admin: User, @Args('recommendedOrderId') recommendedOrderId: string) {
    return this.service.adminDeleteRecommendedOrder(admin.id, recommendedOrderId)
  }
}

