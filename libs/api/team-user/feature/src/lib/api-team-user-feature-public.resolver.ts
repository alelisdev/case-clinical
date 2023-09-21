
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTeamUserInput,
  ApiTeamUserDataAccessPublicService,
  TeamUser,
} from '@case-clinical/api/team-user/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTeamUserFeaturePublicResolver {
  constructor(private readonly service: ApiTeamUserDataAccessPublicService) {}
           
  @Query(() => [TeamUser], { nullable: true })
  publicTeamUsers(
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.publicTeamUsers(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTeamUsers(
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.publicCountTeamUsers(input)
  }

  @Query(() => [TeamUser], { nullable: true })
  publicSelectTeamUsers(
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.publicSelectTeamUsers(input)
  }

  @Query(() => TeamUser, { nullable: true })
  publicTeamUser(@Args('teamUserId') teamUserId: string) {
    return this.service.publicTeamUser(teamUserId)
  }
}
