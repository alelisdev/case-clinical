
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRoleFeaturePermissionInput,
  UserListRoleFeaturePermissionInput,
  UserUpdateRoleFeaturePermissionInput,
  UserUpdateRoleFeaturePermissionsInput,
  ApiRoleFeaturePermissionDataAccessUserService,
  RoleFeaturePermission,
} from '@case-clinical/api/role-feature-permission/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListFeaturePermissionInput, FeaturePermission } from '@case-clinical/api/feature-permission/data-access'
import { UserListRoleInput, Role } from '@case-clinical/api/role/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRoleFeaturePermissionFeatureUserResolver {
  constructor(private readonly service: ApiRoleFeaturePermissionDataAccessUserService) {}

  @Query(() => [RoleFeaturePermission], { nullable: true })
  userRoleFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRoleFeaturePermissionInput, nullable: true }) input?: UserListRoleFeaturePermissionInput,
  ) {
    return this.service.userRoleFeaturePermissions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRoleFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRoleFeaturePermissionInput, nullable: true }) input?: UserListRoleFeaturePermissionInput,
  ) {
    return this.service.userCountRoleFeaturePermissions(user.id, input)
  }

  @Query(() => [RoleFeaturePermission], { nullable: true })
  userSelectRoleFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRoleFeaturePermissionInput, nullable: true }) input?: UserListRoleFeaturePermissionInput,
  ) {
    return this.service.userSelectRoleFeaturePermissions(user.id, input)
  }







  @Query(() => RoleFeaturePermission, { nullable: true })
  userRoleFeaturePermission(@CtxUser() user: User, @Args('roleFeaturePermissionId') roleFeaturePermissionId: string) {
    return this.service.userRoleFeaturePermission(user.id, roleFeaturePermissionId)
  }

  @Mutation(() => RoleFeaturePermission, { nullable: true })
  userCreateRoleFeaturePermission(@CtxUser() user: User, @Args('input') input: UserCreateRoleFeaturePermissionInput,) {
    return this.service.userCreateRoleFeaturePermission(user.id, input)
  }

  @Mutation(() => RoleFeaturePermission, { nullable: true })
  userUpdateRoleFeaturePermission(
    @CtxUser() user: User,
    @Args('roleFeaturePermissionId') roleFeaturePermissionId: string,
    @Args('input') input: UserUpdateRoleFeaturePermissionInput,
  ) {
    return this.service.userUpdateRoleFeaturePermission(user.id, roleFeaturePermissionId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRoleFeaturePermissions(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRoleFeaturePermissionsInput,
  ) {
    return this.service.userUpdateRoleFeaturePermissions(user.id, input)
  }

  @Mutation(() => RoleFeaturePermission, { nullable: true })
  userDeleteRoleFeaturePermission(@CtxUser() user: User, @Args('roleFeaturePermissionId') roleFeaturePermissionId: string) {
    return this.service.userDeleteRoleFeaturePermission(user.id, roleFeaturePermissionId)
  }
}

