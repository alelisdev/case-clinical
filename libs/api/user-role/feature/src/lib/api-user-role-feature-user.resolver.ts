
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateUserRoleInput,
  UserListUserRoleInput,
  UserUpdateUserRoleInput,
  UserUpdateUserRolesInput,
  ApiUserRoleDataAccessUserService,
  UserRole,
} from '@case-clinical/api/user-role/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'



import { UserListRoleInput, Role } from '@case-clinical/api/role/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiUserRoleFeatureUserResolver {
  constructor(private readonly service: ApiUserRoleDataAccessUserService) {}

  @Query(() => [UserRole], { nullable: true })
  userUserRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.userUserRoles(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountUserRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.userCountUserRoles(user.id, input)
  }

  @Query(() => [UserRole], { nullable: true })
  userSelectUserRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.userSelectUserRoles(user.id, input)
  }







  @Query(() => UserRole, { nullable: true })
  userUserRole(@CtxUser() user: User, @Args('userRoleId') userRoleId: string) {
    return this.service.userUserRole(user.id, userRoleId)
  }

  @Mutation(() => UserRole, { nullable: true })
  userCreateUserRole(@CtxUser() user: User, @Args('input') input: UserCreateUserRoleInput,) {
    return this.service.userCreateUserRole(user.id, input)
  }

  @Mutation(() => UserRole, { nullable: true })
  userUpdateUserRole(
    @CtxUser() user: User,
    @Args('userRoleId') userRoleId: string,
    @Args('input') input: UserUpdateUserRoleInput,
  ) {
    return this.service.userUpdateUserRole(user.id, userRoleId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateUserRoles(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateUserRolesInput,
  ) {
    return this.service.userUpdateUserRoles(user.id, input)
  }

  @Mutation(() => UserRole, { nullable: true })
  userDeleteUserRole(@CtxUser() user: User, @Args('userRoleId') userRoleId: string) {
    return this.service.userDeleteUserRole(user.id, userRoleId)
  }
}

