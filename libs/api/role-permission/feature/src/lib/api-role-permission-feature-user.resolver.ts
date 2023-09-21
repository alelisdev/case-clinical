
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRolePermissionInput,
  UserListRolePermissionInput,
  UserUpdateRolePermissionInput,
  UserUpdateRolePermissionsInput,
  ApiRolePermissionDataAccessUserService,
  RolePermission,
} from '@case-clinical/api/role-permission/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPermissionInput, Permission } from '@case-clinical/api/permission/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRolePermissionFeatureUserResolver {
  constructor(private readonly service: ApiRolePermissionDataAccessUserService) {}

  @Query(() => [RolePermission], { nullable: true })
  userRolePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRolePermissionInput, nullable: true }) input?: UserListRolePermissionInput,
  ) {
    return this.service.userRolePermissions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRolePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRolePermissionInput, nullable: true }) input?: UserListRolePermissionInput,
  ) {
    return this.service.userCountRolePermissions(user.id, input)
  }

  @Query(() => [RolePermission], { nullable: true })
  userSelectRolePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRolePermissionInput, nullable: true }) input?: UserListRolePermissionInput,
  ) {
    return this.service.userSelectRolePermissions(user.id, input)
  }







  @Query(() => RolePermission, { nullable: true })
  userRolePermission(@CtxUser() user: User, @Args('rolePermissionId') rolePermissionId: string) {
    return this.service.userRolePermission(user.id, rolePermissionId)
  }

  @Mutation(() => RolePermission, { nullable: true })
  userCreateRolePermission(@CtxUser() user: User, @Args('input') input: UserCreateRolePermissionInput,) {
    return this.service.userCreateRolePermission(user.id, input)
  }

  @Mutation(() => RolePermission, { nullable: true })
  userUpdateRolePermission(
    @CtxUser() user: User,
    @Args('rolePermissionId') rolePermissionId: string,
    @Args('input') input: UserUpdateRolePermissionInput,
  ) {
    return this.service.userUpdateRolePermission(user.id, rolePermissionId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRolePermissions(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRolePermissionsInput,
  ) {
    return this.service.userUpdateRolePermissions(user.id, input)
  }

  @Mutation(() => RolePermission, { nullable: true })
  userDeleteRolePermission(@CtxUser() user: User, @Args('rolePermissionId') rolePermissionId: string) {
    return this.service.userDeleteRolePermission(user.id, rolePermissionId)
  }
}

