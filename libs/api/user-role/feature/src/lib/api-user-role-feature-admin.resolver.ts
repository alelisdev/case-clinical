
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateUserRoleInput,
  AdminListUserRoleInput,
  AdminUpdateUserRoleInput,
  ApiUserRoleDataAccessAdminService,
  UserRole
} from '@case-clinical/api/user-role/data-access'


import { AdminListRoleInput, Role } from '@case-clinical/api/role/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiUserRoleFeatureAdminResolver {
  constructor(private readonly service: ApiUserRoleDataAccessAdminService) {}

  @Query(() => [UserRole], { nullable: true })
  adminUserRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserRoleInput, nullable: true }) input?: AdminListUserRoleInput,
  ) {
    return this.service.adminUserRoles(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountUserRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserRoleInput, nullable: true }) input?: AdminListUserRoleInput,
  ) {
    return this.service.adminCountUserRoles(admin.id, input)
  }





  @Query(() => UserRole, { nullable: true })
  adminUserRole(@CtxUser() admin: User, @Args('userRoleId') userRoleId: string) {
    return this.service.adminUserRole(admin.id, userRoleId)
  }

  @Mutation(() => UserRole, { nullable: true })
  adminCreateUserRole(@CtxUser() admin: User, @Args('input') input: AdminCreateUserRoleInput,) {
    return this.service.adminCreateUserRole(admin.id, input)
  }

  @Mutation(() => UserRole, { nullable: true })
  adminUpdateUserRole(
    @CtxUser() admin: User,
    @Args('userRoleId') userRoleId: string,
    @Args('input') input: AdminUpdateUserRoleInput,
  ) {
    return this.service.adminUpdateUserRole(admin.id, userRoleId, input)
  }

  @Mutation(() => UserRole, { nullable: true })
  adminDeleteUserRole(@CtxUser() admin: User, @Args('userRoleId') userRoleId: string) {
    return this.service.adminDeleteUserRole(admin.id, userRoleId)
  }
}

