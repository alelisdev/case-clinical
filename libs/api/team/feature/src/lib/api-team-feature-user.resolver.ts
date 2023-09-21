
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTeamInput,
  UserListTeamInput,
  UserUpdateTeamInput,
  UserUpdateTeamsInput,
  ApiTeamDataAccessUserService,
  Team,
} from '@case-clinical/api/team/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTeamFeatureUserResolver {
  constructor(private readonly service: ApiTeamDataAccessUserService) {}

  @Query(() => [Team], { nullable: true })
  userTeams(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamInput, nullable: true }) input?: UserListTeamInput,
  ) {
    return this.service.userTeams(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTeams(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamInput, nullable: true }) input?: UserListTeamInput,
  ) {
    return this.service.userCountTeams(user.id, input)
  }

  @Query(() => [Team], { nullable: true })
  userSelectTeams(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamInput, nullable: true }) input?: UserListTeamInput,
  ) {
    return this.service.userSelectTeams(user.id, input)
  }







  @Query(() => Team, { nullable: true })
  userTeam(@CtxUser() user: User, @Args('teamId') teamId: string) {
    return this.service.userTeam(user.id, teamId)
  }

  @Mutation(() => Team, { nullable: true })
  userCreateTeam(@CtxUser() user: User, @Args('input') input: UserCreateTeamInput,) {
    return this.service.userCreateTeam(user.id, input)
  }

  @Mutation(() => Team, { nullable: true })
  userUpdateTeam(
    @CtxUser() user: User,
    @Args('teamId') teamId: string,
    @Args('input') input: UserUpdateTeamInput,
  ) {
    return this.service.userUpdateTeam(user.id, teamId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTeams(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTeamsInput,
  ) {
    return this.service.userUpdateTeams(user.id, input)
  }

  @Mutation(() => Team, { nullable: true })
  userDeleteTeam(@CtxUser() user: User, @Args('teamId') teamId: string) {
    return this.service.userDeleteTeam(user.id, teamId)
  }
}

