
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRoleFeaturePermissionInput,
  ApiRoleFeaturePermissionDataAccessPublicService,
  RoleFeaturePermission,
} from '@case-clinical/api/role-feature-permission/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRoleFeaturePermissionFeaturePublicResolver {
  constructor(private readonly service: ApiRoleFeaturePermissionDataAccessPublicService) {}
           
  @Query(() => [RoleFeaturePermission], { nullable: true })
  publicRoleFeaturePermissions(
    @Args({ name: 'input', type: () => UserListRoleFeaturePermissionInput, nullable: true }) input?: UserListRoleFeaturePermissionInput,
  ) {
    return this.service.publicRoleFeaturePermissions(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRoleFeaturePermissions(
    @Args({ name: 'input', type: () => UserListRoleFeaturePermissionInput, nullable: true }) input?: UserListRoleFeaturePermissionInput,
  ) {
    return this.service.publicCountRoleFeaturePermissions(input)
  }

  @Query(() => [RoleFeaturePermission], { nullable: true })
  publicSelectRoleFeaturePermissions(
    @Args({ name: 'input', type: () => UserListRoleFeaturePermissionInput, nullable: true }) input?: UserListRoleFeaturePermissionInput,
  ) {
    return this.service.publicSelectRoleFeaturePermissions(input)
  }

  @Query(() => RoleFeaturePermission, { nullable: true })
  publicRoleFeaturePermission(@Args('roleFeaturePermissionId') roleFeaturePermissionId: string) {
    return this.service.publicRoleFeaturePermission(roleFeaturePermissionId)
  }
}
