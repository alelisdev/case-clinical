
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateFeaturePermissionInput,
  AdminListFeaturePermissionInput,
  AdminUpdateFeaturePermissionInput,
  ApiFeaturePermissionDataAccessAdminService,
  FeaturePermission
} from '@case-clinical/api/feature-permission/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListFeatureInput, Feature } from '@case-clinical/api/feature/data-access'
import { AdminListPermissionInput, Permission } from '@case-clinical/api/permission/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiFeaturePermissionFeatureAdminResolver {
  constructor(private readonly service: ApiFeaturePermissionDataAccessAdminService) {}

  @Query(() => [FeaturePermission], { nullable: true })
  adminFeaturePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFeaturePermissionInput, nullable: true }) input?: AdminListFeaturePermissionInput,
  ) {
    return this.service.adminFeaturePermissions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountFeaturePermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFeaturePermissionInput, nullable: true }) input?: AdminListFeaturePermissionInput,
  ) {
    return this.service.adminCountFeaturePermissions(admin.id, input)
  }





  @Query(() => FeaturePermission, { nullable: true })
  adminFeaturePermission(@CtxUser() admin: User, @Args('featurePermissionId') featurePermissionId: string) {
    return this.service.adminFeaturePermission(admin.id, featurePermissionId)
  }

  @Mutation(() => FeaturePermission, { nullable: true })
  adminCreateFeaturePermission(@CtxUser() admin: User, @Args('input') input: AdminCreateFeaturePermissionInput,) {
    return this.service.adminCreateFeaturePermission(admin.id, input)
  }

  @Mutation(() => FeaturePermission, { nullable: true })
  adminUpdateFeaturePermission(
    @CtxUser() admin: User,
    @Args('featurePermissionId') featurePermissionId: string,
    @Args('input') input: AdminUpdateFeaturePermissionInput,
  ) {
    return this.service.adminUpdateFeaturePermission(admin.id, featurePermissionId, input)
  }

  @Mutation(() => FeaturePermission, { nullable: true })
  adminDeleteFeaturePermission(@CtxUser() admin: User, @Args('featurePermissionId') featurePermissionId: string) {
    return this.service.adminDeleteFeaturePermission(admin.id, featurePermissionId)
  }
}

