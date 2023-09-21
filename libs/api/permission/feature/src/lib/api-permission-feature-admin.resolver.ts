
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePermissionInput,
  AdminListPermissionInput,
  AdminUpdatePermissionInput,
  ApiPermissionDataAccessAdminService,
  Permission
} from '@case-clinical/api/permission/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPermissionFeatureAdminResolver {
  constructor(private readonly service: ApiPermissionDataAccessAdminService) {}

  @Query(() => [Permission], { nullable: true })
  adminPermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPermissionInput, nullable: true }) input?: AdminListPermissionInput,
  ) {
    return this.service.adminPermissions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPermissions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPermissionInput, nullable: true }) input?: AdminListPermissionInput,
  ) {
    return this.service.adminCountPermissions(admin.id, input)
  }





  @Query(() => Permission, { nullable: true })
  adminPermission(@CtxUser() admin: User, @Args('permissionId') permissionId: string) {
    return this.service.adminPermission(admin.id, permissionId)
  }

  @Mutation(() => Permission, { nullable: true })
  adminCreatePermission(@CtxUser() admin: User, @Args('input') input: AdminCreatePermissionInput,) {
    return this.service.adminCreatePermission(admin.id, input)
  }

  @Mutation(() => Permission, { nullable: true })
  adminUpdatePermission(
    @CtxUser() admin: User,
    @Args('permissionId') permissionId: string,
    @Args('input') input: AdminUpdatePermissionInput,
  ) {
    return this.service.adminUpdatePermission(admin.id, permissionId, input)
  }

  @Mutation(() => Permission, { nullable: true })
  adminDeletePermission(@CtxUser() admin: User, @Args('permissionId') permissionId: string) {
    return this.service.adminDeletePermission(admin.id, permissionId)
  }
}

