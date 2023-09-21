
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRecommendedOrderInput,
  UserListRecommendedOrderInput,
  UserUpdateRecommendedOrderInput,
  UserUpdateRecommendedOrdersInput,
  ApiRecommendedOrderDataAccessUserService,
  RecommendedOrder,
} from '@case-clinical/api/recommended-order/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRecommendedOrderFeatureUserResolver {
  constructor(private readonly service: ApiRecommendedOrderDataAccessUserService) {}

  @Query(() => [RecommendedOrder], { nullable: true })
  userRecommendedOrders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderInput, nullable: true }) input?: UserListRecommendedOrderInput,
  ) {
    return this.service.userRecommendedOrders(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRecommendedOrders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderInput, nullable: true }) input?: UserListRecommendedOrderInput,
  ) {
    return this.service.userCountRecommendedOrders(user.id, input)
  }

  @Query(() => [RecommendedOrder], { nullable: true })
  userSelectRecommendedOrders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderInput, nullable: true }) input?: UserListRecommendedOrderInput,
  ) {
    return this.service.userSelectRecommendedOrders(user.id, input)
  }







  @Query(() => RecommendedOrder, { nullable: true })
  userRecommendedOrder(@CtxUser() user: User, @Args('recommendedOrderId') recommendedOrderId: string) {
    return this.service.userRecommendedOrder(user.id, recommendedOrderId)
  }

  @Mutation(() => RecommendedOrder, { nullable: true })
  userCreateRecommendedOrder(@CtxUser() user: User, @Args('input') input: UserCreateRecommendedOrderInput,) {
    return this.service.userCreateRecommendedOrder(user.id, input)
  }

  @Mutation(() => RecommendedOrder, { nullable: true })
  userUpdateRecommendedOrder(
    @CtxUser() user: User,
    @Args('recommendedOrderId') recommendedOrderId: string,
    @Args('input') input: UserUpdateRecommendedOrderInput,
  ) {
    return this.service.userUpdateRecommendedOrder(user.id, recommendedOrderId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRecommendedOrders(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRecommendedOrdersInput,
  ) {
    return this.service.userUpdateRecommendedOrders(user.id, input)
  }

  @Mutation(() => RecommendedOrder, { nullable: true })
  userDeleteRecommendedOrder(@CtxUser() user: User, @Args('recommendedOrderId') recommendedOrderId: string) {
    return this.service.userDeleteRecommendedOrder(user.id, recommendedOrderId)
  }
}

