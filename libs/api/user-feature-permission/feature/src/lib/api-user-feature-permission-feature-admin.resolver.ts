
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateUserFeaturePermissionInput,
  AdminListUserFeaturePermissionInput,
  AdminUpdateUserFeaturePermissionInput,
  AdminUserFeaturePermissionUpdateInput,
  ApiUserFeaturePermissionDataAccessAdminService,
  UserFeaturePermission,
  UserFeaturePermissionUpdateResult
} from '@case-clinical/api/user-feature-permission/data-access'


import { AdminListFeaturePermissionInput, FeaturePermission } from '@case-clinical/api/feature-permission/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiUserFeaturePermissionFeatureAdminResolver {
  constructor(private readonly service: ApiUserFeaturePermissionDataAccessAdminService) {}

  
  @Mutation(() => UserFeaturePermissionUpdateResult, { nullable: true })
  adminUpdateUserRoles(
    @CtxUser() admin: User,
    @Args({ name: 'userId', type: () => String, nullable: true }) userId?: string,
    @Args({ name: 'input', type: () => AdminUserFeaturePermissionUpdateInput, nullable: true }) input?: AdminUserFeaturePermissionUpdateInput,
  ) {
    return this.service.adminUpdateUserRoles(admin.id, userId, input)
  }


  @Query(() => [UserFeaturePermission], { nullable: true })
  adminUserFeaturePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserFeaturePermissionInput, nullable: true }) input?: AdminListUserFeaturePermissionInput,
  ) {
    return this.service.adminUserFeaturePermissions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountUserFeaturePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserFeaturePermissionInput, nullable: true }) input?: AdminListUserFeaturePermissionInput,
  ) {
    return this.service.adminCountUserFeaturePermissions(admin.id, input)
  }





  @Query(() => UserFeaturePermission, { nullable: true })
  adminUserFeaturePermission(@CtxUser() admin: User, @Args('userFeaturePermissionId') userFeaturePermissionId: string) {
    return this.service.adminUserFeaturePermission(admin.id, userFeaturePermissionId)
  }

  @Mutation(() => UserFeaturePermission, { nullable: true })
  adminCreateUserFeaturePermission(@CtxUser() admin: User, @Args('input') input: AdminCreateUserFeaturePermissionInput,) {
    return this.service.adminCreateUserFeaturePermission(admin.id, input)
  }

  @Mutation(() => UserFeaturePermission, { nullable: true })
  adminUpdateUserFeaturePermission(
    @CtxUser() admin: User,
    @Args('userFeaturePermissionId') userFeaturePermissionId: string,
    @Args('input') input: AdminUpdateUserFeaturePermissionInput,
  ) {
    return this.service.adminUpdateUserFeaturePermission(admin.id, userFeaturePermissionId, input)
  }

  @Mutation(() => UserFeaturePermission, { nullable: true })
  adminDeleteUserFeaturePermission(@CtxUser() admin: User, @Args('userFeaturePermissionId') userFeaturePermissionId: string) {
    return this.service.adminDeleteUserFeaturePermission(admin.id, userFeaturePermissionId)
  }
}

