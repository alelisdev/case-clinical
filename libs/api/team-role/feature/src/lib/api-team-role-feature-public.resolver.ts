
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTeamRoleInput,
  ApiTeamRoleDataAccessPublicService,
  TeamRole,
} from '@case-clinical/api/team-role/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTeamRoleFeaturePublicResolver {
  constructor(private readonly service: ApiTeamRoleDataAccessPublicService) {}
           
  @Query(() => [TeamRole], { nullable: true })
  publicTeamRoles(
    @Args({ name: 'input', type: () => UserListTeamRoleInput, nullable: true }) input?: UserListTeamRoleInput,
  ) {
    return this.service.publicTeamRoles(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTeamRoles(
    @Args({ name: 'input', type: () => UserListTeamRoleInput, nullable: true }) input?: UserListTeamRoleInput,
  ) {
    return this.service.publicCountTeamRoles(input)
  }

  @Query(() => [TeamRole], { nullable: true })
  publicSelectTeamRoles(
    @Args({ name: 'input', type: () => UserListTeamRoleInput, nullable: true }) input?: UserListTeamRoleInput,
  ) {
    return this.service.publicSelectTeamRoles(input)
  }

  @Query(() => TeamRole, { nullable: true })
  publicTeamRole(@Args('teamRoleId') teamRoleId: string) {
    return this.service.publicTeamRole(teamRoleId)
  }
}
