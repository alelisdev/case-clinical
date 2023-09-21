
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRoleInput,
  AdminListRoleInput,
  AdminUpdateRoleInput,
  ApiRoleDataAccessAdminService,
  Role
} from '@case-clinical/api/role/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRoleFeatureAdminResolver {
  constructor(private readonly service: ApiRoleDataAccessAdminService) {}

  @Query(() => [Role], { nullable: true })
  adminRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRoleInput, nullable: true }) input?: AdminListRoleInput,
  ) {
    return this.service.adminRoles(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRoleInput, nullable: true }) input?: AdminListRoleInput,
  ) {
    return this.service.adminCountRoles(admin.id, input)
  }





  @Query(() => Role, { nullable: true })
  adminRole(@CtxUser() admin: User, @Args('roleId') roleId: string) {
    return this.service.adminRole(admin.id, roleId)
  }

  @Mutation(() => Role, { nullable: true })
  adminCreateRole(@CtxUser() admin: User, @Args('input') input: AdminCreateRoleInput,) {
    return this.service.adminCreateRole(admin.id, input)
  }

  @Mutation(() => Role, { nullable: true })
  adminUpdateRole(
    @CtxUser() admin: User,
    @Args('roleId') roleId: string,
    @Args('input') input: AdminUpdateRoleInput,
  ) {
    return this.service.adminUpdateRole(admin.id, roleId, input)
  }

  @Mutation(() => Role, { nullable: true })
  adminDeleteRole(@CtxUser() admin: User, @Args('roleId') roleId: string) {
    return this.service.adminDeleteRole(admin.id, roleId)
  }
}

