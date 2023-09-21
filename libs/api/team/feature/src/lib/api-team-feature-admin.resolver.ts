
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTeamInput,
  AdminListTeamInput,
  AdminUpdateTeamInput,
  ApiTeamDataAccessAdminService,
  Team
} from '@case-clinical/api/team/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTeamFeatureAdminResolver {
  constructor(private readonly service: ApiTeamDataAccessAdminService) {}

  @Query(() => [Team], { nullable: true })
  adminTeams(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamInput, nullable: true }) input?: AdminListTeamInput,
  ) {
    return this.service.adminTeams(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTeams(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamInput, nullable: true }) input?: AdminListTeamInput,
  ) {
    return this.service.adminCountTeams(admin.id, input)
  }





  @Query(() => Team, { nullable: true })
  adminTeam(@CtxUser() admin: User, @Args('teamId') teamId: string) {
    return this.service.adminTeam(admin.id, teamId)
  }

  @Mutation(() => Team, { nullable: true })
  adminCreateTeam(@CtxUser() admin: User, @Args('input') input: AdminCreateTeamInput,) {
    return this.service.adminCreateTeam(admin.id, input)
  }

  @Mutation(() => Team, { nullable: true })
  adminUpdateTeam(
    @CtxUser() admin: User,
    @Args('teamId') teamId: string,
    @Args('input') input: AdminUpdateTeamInput,
  ) {
    return this.service.adminUpdateTeam(admin.id, teamId, input)
  }

  @Mutation(() => Team, { nullable: true })
  adminDeleteTeam(@CtxUser() admin: User, @Args('teamId') teamId: string) {
    return this.service.adminDeleteTeam(admin.id, teamId)
  }
}

