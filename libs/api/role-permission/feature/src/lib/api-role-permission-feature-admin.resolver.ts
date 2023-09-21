
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRolePermissionInput,
  AdminListRolePermissionInput,
  AdminUpdateRolePermissionInput,
  ApiRolePermissionDataAccessAdminService,
  RolePermission
} from '@case-clinical/api/role-permission/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPermissionInput, Permission } from '@case-clinical/api/permission/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRolePermissionFeatureAdminResolver {
  constructor(private readonly service: ApiRolePermissionDataAccessAdminService) {}

  @Query(() => [RolePermission], { nullable: true })
  adminRolePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRolePermissionInput, nullable: true }) input?: AdminListRolePermissionInput,
  ) {
    return this.service.adminRolePermissions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRolePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRolePermissionInput, nullable: true }) input?: AdminListRolePermissionInput,
  ) {
    return this.service.adminCountRolePermissions(admin.id, input)
  }





  @Query(() => RolePermission, { nullable: true })
  adminRolePermission(@CtxUser() admin: User, @Args('rolePermissionId') rolePermissionId: string) {
    return this.service.adminRolePermission(admin.id, rolePermissionId)
  }

  @Mutation(() => RolePermission, { nullable: true })
  adminCreateRolePermission(@CtxUser() admin: User, @Args('input') input: AdminCreateRolePermissionInput,) {
    return this.service.adminCreateRolePermission(admin.id, input)
  }

  @Mutation(() => RolePermission, { nullable: true })
  adminUpdateRolePermission(
    @CtxUser() admin: User,
    @Args('rolePermissionId') rolePermissionId: string,
    @Args('input') input: AdminUpdateRolePermissionInput,
  ) {
    return this.service.adminUpdateRolePermission(admin.id, rolePermissionId, input)
  }

  @Mutation(() => RolePermission, { nullable: true })
  adminDeleteRolePermission(@CtxUser() admin: User, @Args('rolePermissionId') rolePermissionId: string) {
    return this.service.adminDeleteRolePermission(admin.id, rolePermissionId)
  }
}

