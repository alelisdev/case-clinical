
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTeamRoleInput,
  UserListTeamRoleInput,
  UserUpdateTeamRoleInput,
  UserUpdateTeamRolesInput,
  ApiTeamRoleDataAccessUserService,
  TeamRole,
} from '@case-clinical/api/team-role/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTeamRoleFeatureUserResolver {
  constructor(private readonly service: ApiTeamRoleDataAccessUserService) {}

  @Query(() => [TeamRole], { nullable: true })
  userTeamRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamRoleInput, nullable: true }) input?: UserListTeamRoleInput,
  ) {
    return this.service.userTeamRoles(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTeamRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamRoleInput, nullable: true }) input?: UserListTeamRoleInput,
  ) {
    return this.service.userCountTeamRoles(user.id, input)
  }

  @Query(() => [TeamRole], { nullable: true })
  userSelectTeamRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamRoleInput, nullable: true }) input?: UserListTeamRoleInput,
  ) {
    return this.service.userSelectTeamRoles(user.id, input)
  }







  @Query(() => TeamRole, { nullable: true })
  userTeamRole(@CtxUser() user: User, @Args('teamRoleId') teamRoleId: string) {
    return this.service.userTeamRole(user.id, teamRoleId)
  }

  @Mutation(() => TeamRole, { nullable: true })
  userCreateTeamRole(@CtxUser() user: User, @Args('input') input: UserCreateTeamRoleInput,) {
    return this.service.userCreateTeamRole(user.id, input)
  }

  @Mutation(() => TeamRole, { nullable: true })
  userUpdateTeamRole(
    @CtxUser() user: User,
    @Args('teamRoleId') teamRoleId: string,
    @Args('input') input: UserUpdateTeamRoleInput,
  ) {
    return this.service.userUpdateTeamRole(user.id, teamRoleId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTeamRoles(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTeamRolesInput,
  ) {
    return this.service.userUpdateTeamRoles(user.id, input)
  }

  @Mutation(() => TeamRole, { nullable: true })
  userDeleteTeamRole(@CtxUser() user: User, @Args('teamRoleId') teamRoleId: string) {
    return this.service.userDeleteTeamRole(user.id, teamRoleId)
  }
}

