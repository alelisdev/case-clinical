
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTeamUserInput,
  AdminListTeamUserInput,
  AdminUpdateTeamUserInput,
  ApiTeamUserDataAccessAdminService,
  TeamUser
} from '@case-clinical/api/team-user/data-access'


import { AdminListTeamInput, Team } from '@case-clinical/api/team/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'
import { AdminListTeamRoleInput, TeamRole } from '@case-clinical/api/team-role/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTeamUserFeatureAdminResolver {
  constructor(private readonly service: ApiTeamUserDataAccessAdminService) {}

  @Query(() => [TeamUser], { nullable: true })
  adminTeamUsers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamUserInput, nullable: true }) input?: AdminListTeamUserInput,
  ) {
    return this.service.adminTeamUsers(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTeamUsers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamUserInput, nullable: true }) input?: AdminListTeamUserInput,
  ) {
    return this.service.adminCountTeamUsers(admin.id, input)
  }





  @Query(() => TeamUser, { nullable: true })
  adminTeamUser(@CtxUser() admin: User, @Args('teamUserId') teamUserId: string) {
    return this.service.adminTeamUser(admin.id, teamUserId)
  }

  @Mutation(() => TeamUser, { nullable: true })
  adminCreateTeamUser(@CtxUser() admin: User, @Args('input') input: AdminCreateTeamUserInput,) {
    return this.service.adminCreateTeamUser(admin.id, input)
  }

  @Mutation(() => TeamUser, { nullable: true })
  adminUpdateTeamUser(
    @CtxUser() admin: User,
    @Args('teamUserId') teamUserId: string,
    @Args('input') input: AdminUpdateTeamUserInput,
  ) {
    return this.service.adminUpdateTeamUser(admin.id, teamUserId, input)
  }

  @Mutation(() => TeamUser, { nullable: true })
  adminDeleteTeamUser(@CtxUser() admin: User, @Args('teamUserId') teamUserId: string) {
    return this.service.adminDeleteTeamUser(admin.id, teamUserId)
  }
}

