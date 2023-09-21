
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTeamInput,
  ApiTeamDataAccessPublicService,
  Team,
} from '@case-clinical/api/team/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTeamFeaturePublicResolver {
  constructor(private readonly service: ApiTeamDataAccessPublicService) {}
           
  @Query(() => [Team], { nullable: true })
  publicTeams(
    @Args({ name: 'input', type: () => UserListTeamInput, nullable: true }) input?: UserListTeamInput,
  ) {
    return this.service.publicTeams(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTeams(
    @Args({ name: 'input', type: () => UserListTeamInput, nullable: true }) input?: UserListTeamInput,
  ) {
    return this.service.publicCountTeams(input)
  }

  @Query(() => [Team], { nullable: true })
  publicSelectTeams(
    @Args({ name: 'input', type: () => UserListTeamInput, nullable: true }) input?: UserListTeamInput,
  ) {
    return this.service.publicSelectTeams(input)
  }

  @Query(() => Team, { nullable: true })
  publicTeam(@Args('teamId') teamId: string) {
    return this.service.publicTeam(teamId)
  }
}
