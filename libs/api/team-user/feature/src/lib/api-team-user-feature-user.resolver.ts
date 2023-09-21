
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTeamUserInput,
  UserListTeamUserInput,
  UserUpdateTeamUserInput,
  UserUpdateTeamUsersInput,
  ApiTeamUserDataAccessUserService,
  TeamUser,
} from '@case-clinical/api/team-user/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'



import { UserListTeamInput, Team } from '@case-clinical/api/team/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'
import { UserListTeamRoleInput, TeamRole } from '@case-clinical/api/team-role/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTeamUserFeatureUserResolver {
  constructor(private readonly service: ApiTeamUserDataAccessUserService) {}

  @Query(() => [TeamUser], { nullable: true })
  userTeamUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.userTeamUsers(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTeamUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.userCountTeamUsers(user.id, input)
  }

  @Query(() => [TeamUser], { nullable: true })
  userSelectTeamUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.userSelectTeamUsers(user.id, input)
  }







  @Query(() => TeamUser, { nullable: true })
  userTeamUser(@CtxUser() user: User, @Args('teamUserId') teamUserId: string) {
    return this.service.userTeamUser(user.id, teamUserId)
  }

  @Mutation(() => TeamUser, { nullable: true })
  userCreateTeamUser(@CtxUser() user: User, @Args('input') input: UserCreateTeamUserInput,) {
    return this.service.userCreateTeamUser(user.id, input)
  }

  @Mutation(() => TeamUser, { nullable: true })
  userUpdateTeamUser(
    @CtxUser() user: User,
    @Args('teamUserId') teamUserId: string,
    @Args('input') input: UserUpdateTeamUserInput,
  ) {
    return this.service.userUpdateTeamUser(user.id, teamUserId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTeamUsers(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTeamUsersInput,
  ) {
    return this.service.userUpdateTeamUsers(user.id, input)
  }

  @Mutation(() => TeamUser, { nullable: true })
  userDeleteTeamUser(@CtxUser() user: User, @Args('teamUserId') teamUserId: string) {
    return this.service.userDeleteTeamUser(user.id, teamUserId)
  }
}

