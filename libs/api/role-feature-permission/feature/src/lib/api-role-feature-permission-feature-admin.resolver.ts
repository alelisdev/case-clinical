
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRoleFeaturePermissionInput,
  AdminListRoleFeaturePermissionInput,
  AdminUpdateRoleFeaturePermissionInput,
  ApiRoleFeaturePermissionDataAccessAdminService,
  RoleFeaturePermission,
  RoleFeaturePermissionUpdateResult,
  AdminRoleFeaturePermissionUpdateInput
} from '@case-clinical/api/role-feature-permission/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListFeaturePermissionInput, FeaturePermission } from '@case-clinical/api/feature-permission/data-access'
import { AdminListRoleInput, Role } from '@case-clinical/api/role/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRoleFeaturePermissionFeatureAdminResolver {
  constructor(private readonly service: ApiRoleFeaturePermissionDataAccessAdminService) {}

  @Query(() => [RoleFeaturePermission], { nullable: true })
  adminRoleFeaturePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRoleFeaturePermissionInput, nullable: true }) input?: AdminListRoleFeaturePermissionInput,
  ) {
    return this.service.adminRoleFeaturePermissions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRoleFeaturePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRoleFeaturePermissionInput, nullable: true }) input?: AdminListRoleFeaturePermissionInput,
  ) {
    return this.service.adminCountRoleFeaturePermissions(admin.id, input)
  }


  @Mutation(() => RoleFeaturePermissionUpdateResult, { nullable: true })
  adminRoleFeaturePermissionsUpdate(
    @CtxUser() admin: User,
    @Args({ name: 'roleId', type: () => String, nullable: true }) roleId?: string,
    @Args({ name: 'input', type: () => AdminRoleFeaturePermissionUpdateInput, nullable: true }) input?: AdminRoleFeaturePermissionUpdateInput,
  ) {
    return this.service.updateRolePermissions(roleId, input)
  }



  @Query(() => RoleFeaturePermission, { nullable: true })
  adminRoleFeaturePermission(@CtxUser() admin: User, @Args('roleFeaturePermissionId') roleFeaturePermissionId: string) {
    return this.service.adminRoleFeaturePermission(admin.id, roleFeaturePermissionId)
  }

  @Mutation(() => RoleFeaturePermission, { nullable: true })
  adminCreateRoleFeaturePermission(@CtxUser() admin: User, @Args('input') input: AdminCreateRoleFeaturePermissionInput,) {
    return this.service.adminCreateRoleFeaturePermission(admin.id, input)
  }

  @Mutation(() => RoleFeaturePermission, { nullable: true })
  adminUpdateRoleFeaturePermission(
    @CtxUser() admin: User,
    @Args('roleFeaturePermissionId') roleFeaturePermissionId: string,
    @Args('input') input: AdminUpdateRoleFeaturePermissionInput,
  ) {
    return this.service.adminUpdateRoleFeaturePermission(admin.id, roleFeaturePermissionId, input)
  }

  @Mutation(() => RoleFeaturePermission, { nullable: true })
  adminDeleteRoleFeaturePermission(@CtxUser() admin: User, @Args('roleFeaturePermissionId') roleFeaturePermissionId: string) {
    return this.service.adminDeleteRoleFeaturePermission(admin.id, roleFeaturePermissionId)
  }
}

