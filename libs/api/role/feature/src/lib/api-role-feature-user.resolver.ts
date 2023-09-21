
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRoleInput,
  UserListRoleInput,
  UserUpdateRoleInput,
  UserUpdateRolesInput,
  ApiRoleDataAccessUserService,
  Role,
} from '@case-clinical/api/role/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRoleFeatureUserResolver {
  constructor(private readonly service: ApiRoleDataAccessUserService) {}

  @Query(() => [Role], { nullable: true })
  userRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRoleInput, nullable: true }) input?: UserListRoleInput,
  ) {
    return this.service.userRoles(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRoleInput, nullable: true }) input?: UserListRoleInput,
  ) {
    return this.service.userCountRoles(user.id, input)
  }

  @Query(() => [Role], { nullable: true })
  userSelectRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRoleInput, nullable: true }) input?: UserListRoleInput,
  ) {
    return this.service.userSelectRoles(user.id, input)
  }







  @Query(() => Role, { nullable: true })
  userRole(@CtxUser() user: User, @Args('roleId') roleId: string) {
    return this.service.userRole(user.id, roleId)
  }

  @Mutation(() => Role, { nullable: true })
  userCreateRole(@CtxUser() user: User, @Args('input') input: UserCreateRoleInput,) {
    return this.service.userCreateRole(user.id, input)
  }

  @Mutation(() => Role, { nullable: true })
  userUpdateRole(
    @CtxUser() user: User,
    @Args('roleId') roleId: string,
    @Args('input') input: UserUpdateRoleInput,
  ) {
    return this.service.userUpdateRole(user.id, roleId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRoles(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRolesInput,
  ) {
    return this.service.userUpdateRoles(user.id, input)
  }

  @Mutation(() => Role, { nullable: true })
  userDeleteRole(@CtxUser() user: User, @Args('roleId') roleId: string) {
    return this.service.userDeleteRole(user.id, roleId)
  }
}

