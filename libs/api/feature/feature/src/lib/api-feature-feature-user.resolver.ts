
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateFeatureInput,
  UserListFeatureInput,
  UserUpdateFeatureInput,
  ApiFeatureDataAccessUserService,
  Feature,
} from '@case-clinical/api/feature/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiFeatureFeatureUserResolver {
  constructor(private readonly service: ApiFeatureDataAccessUserService) {}

  @Query(() => [Feature], { nullable: true })
  userFeatures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeatureInput, nullable: true }) input?: UserListFeatureInput,
  ) {
    return this.service.userFeatures(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountFeatures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeatureInput, nullable: true }) input?: UserListFeatureInput,
  ) {
    return this.service.userCountFeatures(user.id, input)
  }

  @Query(() => [Feature], { nullable: true })
  userSelectFeatures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeatureInput, nullable: true }) input?: UserListFeatureInput,
  ) {
    return this.service.userSelectFeatures(user.id, input)
  }







  @Query(() => Feature, { nullable: true })
  userFeature(@CtxUser() user: User, @Args('featureId') featureId: string) {
    return this.service.userFeature(user.id, featureId)
  }

  @Mutation(() => Feature, { nullable: true })
  userCreateFeature(@CtxUser() user: User, @Args('input') input: UserCreateFeatureInput,) {
    return this.service.userCreateFeature(user.id, input)
  }

  @Mutation(() => Feature, { nullable: true })
  userUpdateFeature(
    @CtxUser() user: User,
    @Args('featureId') featureId: string,
    @Args('input') input: UserUpdateFeatureInput,
  ) {
    return this.service.userUpdateFeature(user.id, featureId, input)
  }

  @Mutation(() => Feature, { nullable: true })
  userDeleteFeature(@CtxUser() user: User, @Args('featureId') featureId: string) {
    return this.service.userDeleteFeature(user.id, featureId)
  }
}

