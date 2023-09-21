
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRoleFeatureInput,
  AdminListRoleFeatureInput,
  AdminUpdateRoleFeatureInput,
  ApiRoleFeatureDataAccessAdminService,
  RoleFeature
} from '@case-clinical/api/role-feature/data-access'
import { Role } from '@case-clinical/api/role/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRoleFeatureFeatureAdminResolver {
  constructor(private readonly service: ApiRoleFeatureDataAccessAdminService) {}

  @Query(() => [RoleFeature], { nullable: true })
  adminRoleFeatures(
    @CtxUser() admin: Role,
    @Args({ name: 'input', type: () => AdminListRoleFeatureInput, nullable: true }) input?: AdminListRoleFeatureInput,
  ) {
    return this.service.adminRoleFeatures(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRoleFeatures(
    @CtxUser() admin: Role,
    @Args({ name: 'input', type: () => AdminListRoleFeatureInput, nullable: true }) input?: AdminListRoleFeatureInput,
  ) {
    return this.service.adminCountRoleFeatures(admin.id, input)
  }

  @Query(() => RoleFeature, { nullable: true })
  adminRoleFeature(@CtxUser() admin: Role, @Args('roleFeatureId') roleFeatureId: string) {
    return this.service.adminRoleFeature(admin.id, roleFeatureId)
  }

  @Mutation(() => RoleFeature, { nullable: true })
  adminCreateRoleFeature(@CtxUser() admin: Role, @Args('input') input: AdminCreateRoleFeatureInput,) {
    return this.service.adminCreateRoleFeature(admin.id, input)
  }

  @Mutation(() => RoleFeature, { nullable: true })
  adminUpdateRoleFeature(
    @CtxUser() admin: Role,
    @Args('roleFeatureId') roleFeatureId: string,
    @Args('input') input: AdminUpdateRoleFeatureInput,
  ) {
    return this.service.adminUpdateRoleFeature(admin.id, roleFeatureId, input)
  }

  @Mutation(() => RoleFeature, { nullable: true })
  adminDeleteRoleFeature(@CtxUser() admin: Role, @Args('roleFeatureId') roleFeatureId: string) {
    return this.service.adminDeleteRoleFeature(admin.id, roleFeatureId)
  }
}

