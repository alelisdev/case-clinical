
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRolePermissionInput,
  ApiRolePermissionDataAccessPublicService,
  RolePermission,
} from '@case-clinical/api/role-permission/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRolePermissionFeaturePublicResolver {
  constructor(private readonly service: ApiRolePermissionDataAccessPublicService) {}
           
  @Query(() => [RolePermission], { nullable: true })
  publicRolePermissions(
    @Args({ name: 'input', type: () => UserListRolePermissionInput, nullable: true }) input?: UserListRolePermissionInput,
  ) {
    return this.service.publicRolePermissions(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRolePermissions(
    @Args({ name: 'input', type: () => UserListRolePermissionInput, nullable: true }) input?: UserListRolePermissionInput,
  ) {
    return this.service.publicCountRolePermissions(input)
  }

  @Query(() => [RolePermission], { nullable: true })
  publicSelectRolePermissions(
    @Args({ name: 'input', type: () => UserListRolePermissionInput, nullable: true }) input?: UserListRolePermissionInput,
  ) {
    return this.service.publicSelectRolePermissions(input)
  }

  @Query(() => RolePermission, { nullable: true })
  publicRolePermission(@Args('rolePermissionId') rolePermissionId: string) {
    return this.service.publicRolePermission(rolePermissionId)
  }
}
