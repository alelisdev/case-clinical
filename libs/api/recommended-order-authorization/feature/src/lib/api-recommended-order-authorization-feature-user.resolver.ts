
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRecommendedOrderAuthorizationInput,
  UserListRecommendedOrderAuthorizationInput,
  UserUpdateRecommendedOrderAuthorizationInput,
  UserUpdateRecommendedOrderAuthorizationsInput,
  ApiRecommendedOrderAuthorizationDataAccessUserService,
  RecommendedOrderAuthorization,
} from '@case-clinical/api/recommended-order-authorization/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListAuthorizationInput, Authorization } from '@case-clinical/api/authorization/data-access'
import { UserListRecommendedOrderInput, RecommendedOrder } from '@case-clinical/api/recommended-order/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRecommendedOrderAuthorizationFeatureUserResolver {
  constructor(private readonly service: ApiRecommendedOrderAuthorizationDataAccessUserService) {}

  @Query(() => [RecommendedOrderAuthorization], { nullable: true })
  userRecommendedOrderAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderAuthorizationInput, nullable: true }) input?: UserListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.userRecommendedOrderAuthorizations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRecommendedOrderAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderAuthorizationInput, nullable: true }) input?: UserListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.userCountRecommendedOrderAuthorizations(user.id, input)
  }

  @Query(() => [RecommendedOrderAuthorization], { nullable: true })
  userSelectRecommendedOrderAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderAuthorizationInput, nullable: true }) input?: UserListRecommendedOrderAuthorizationInput,
  ) {
    return this.service.userSelectRecommendedOrderAuthorizations(user.id, input)
  }







  @Query(() => RecommendedOrderAuthorization, { nullable: true })
  userRecommendedOrderAuthorization(@CtxUser() user: User, @Args('recommendedOrderAuthorizationId') recommendedOrderAuthorizationId: string) {
    return this.service.userRecommendedOrderAuthorization(user.id, recommendedOrderAuthorizationId)
  }

  @Mutation(() => RecommendedOrderAuthorization, { nullable: true })
  userCreateRecommendedOrderAuthorization(@CtxUser() user: User, @Args('input') input: UserCreateRecommendedOrderAuthorizationInput,) {
    return this.service.userCreateRecommendedOrderAuthorization(user.id, input)
  }

  @Mutation(() => RecommendedOrderAuthorization, { nullable: true })
  userUpdateRecommendedOrderAuthorization(
    @CtxUser() user: User,
    @Args('recommendedOrderAuthorizationId') recommendedOrderAuthorizationId: string,
    @Args('input') input: UserUpdateRecommendedOrderAuthorizationInput,
  ) {
    return this.service.userUpdateRecommendedOrderAuthorization(user.id, recommendedOrderAuthorizationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRecommendedOrderAuthorizations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRecommendedOrderAuthorizationsInput,
  ) {
    return this.service.userUpdateRecommendedOrderAuthorizations(user.id, input)
  }

  @Mutation(() => RecommendedOrderAuthorization, { nullable: true })
  userDeleteRecommendedOrderAuthorization(@CtxUser() user: User, @Args('recommendedOrderAuthorizationId') recommendedOrderAuthorizationId: string) {
    return this.service.userDeleteRecommendedOrderAuthorization(user.id, recommendedOrderAuthorizationId)
  }
}

