
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateFeaturePermissionInput,
  UserListFeaturePermissionInput,
  UserUpdateFeaturePermissionInput,
  ApiFeaturePermissionDataAccessUserService,
  FeaturePermission,
} from '@case-clinical/api/feature-permission/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListFeatureInput, Feature } from '@case-clinical/api/feature/data-access'
import { UserListPermissionInput, Permission } from '@case-clinical/api/permission/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiFeaturePermissionFeatureUserResolver {
  constructor(private readonly service: ApiFeaturePermissionDataAccessUserService) {}

  @Query(() => [FeaturePermission], { nullable: true })
  userFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeaturePermissionInput, nullable: true }) input?: UserListFeaturePermissionInput,
  ) {
    return this.service.userFeaturePermissions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeaturePermissionInput, nullable: true }) input?: UserListFeaturePermissionInput,
  ) {
    return this.service.userCountFeaturePermissions(user.id, input)
  }

  @Query(() => [FeaturePermission], { nullable: true })
  userSelectFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeaturePermissionInput, nullable: true }) input?: UserListFeaturePermissionInput,
  ) {
    return this.service.userSelectFeaturePermissions(user.id, input)
  }







  @Query(() => FeaturePermission, { nullable: true })
  userFeaturePermission(@CtxUser() user: User, @Args('featurePermissionId') featurePermissionId: string) {
    return this.service.userFeaturePermission(user.id, featurePermissionId)
  }

  @Mutation(() => FeaturePermission, { nullable: true })
  userCreateFeaturePermission(@CtxUser() user: User, @Args('input') input: UserCreateFeaturePermissionInput,) {
    return this.service.userCreateFeaturePermission(user.id, input)
  }

  @Mutation(() => FeaturePermission, { nullable: true })
  userUpdateFeaturePermission(
    @CtxUser() user: User,
    @Args('featurePermissionId') featurePermissionId: string,
    @Args('input') input: UserUpdateFeaturePermissionInput,
  ) {
    return this.service.userUpdateFeaturePermission(user.id, featurePermissionId, input)
  }

  @Mutation(() => FeaturePermission, { nullable: true })
  userDeleteFeaturePermission(@CtxUser() user: User, @Args('featurePermissionId') featurePermissionId: string) {
    return this.service.userDeleteFeaturePermission(user.id, featurePermissionId)
  }
}

