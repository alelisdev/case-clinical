
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateUserFeatureInput,
  UserListUserFeatureInput,
  UserUpdateUserFeatureInput,
  ApiUserFeatureDataAccessUserService,
  UserFeature,
} from '@case-clinical/api/user-feature/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'



import { UserListFeatureInput, Feature } from '@case-clinical/api/feature/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiUserFeatureFeatureUserResolver {
  constructor(private readonly service: ApiUserFeatureDataAccessUserService) {}

  @Query(() => [UserFeature], { nullable: true })
  userUserFeatures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserFeatureInput, nullable: true }) input?: UserListUserFeatureInput,
  ) {
    return this.service.userUserFeatures(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountUserFeatures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserFeatureInput, nullable: true }) input?: UserListUserFeatureInput,
  ) {
    return this.service.userCountUserFeatures(user.id, input)
  }

  @Query(() => [UserFeature], { nullable: true })
  userSelectUserFeatures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserFeatureInput, nullable: true }) input?: UserListUserFeatureInput,
  ) {
    return this.service.userSelectUserFeatures(user.id, input)
  }







  @Query(() => UserFeature, { nullable: true })
  userUserFeature(@CtxUser() user: User, @Args('userFeatureId') userFeatureId: string) {
    return this.service.userUserFeature(user.id, userFeatureId)
  }

  @Mutation(() => UserFeature, { nullable: true })
  userCreateUserFeature(@CtxUser() user: User, @Args('input') input: UserCreateUserFeatureInput,) {
    return this.service.userCreateUserFeature(user.id, input)
  }

  @Mutation(() => UserFeature, { nullable: true })
  userUpdateUserFeature(
    @CtxUser() user: User,
    @Args('userFeatureId') userFeatureId: string,
    @Args('input') input: UserUpdateUserFeatureInput,
  ) {
    return this.service.userUpdateUserFeature(user.id, userFeatureId, input)
  }

  @Mutation(() => UserFeature, { nullable: true })
  userDeleteUserFeature(@CtxUser() user: User, @Args('userFeatureId') userFeatureId: string) {
    return this.service.userDeleteUserFeature(user.id, userFeatureId)
  }
}

