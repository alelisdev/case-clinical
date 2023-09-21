
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTeamRoleInput,
  AdminListTeamRoleInput,
  AdminUpdateTeamRoleInput,
  ApiTeamRoleDataAccessAdminService,
  TeamRole
} from '@case-clinical/api/team-role/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTeamRoleFeatureAdminResolver {
  constructor(private readonly service: ApiTeamRoleDataAccessAdminService) {}

  @Query(() => [TeamRole], { nullable: true })
  adminTeamRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamRoleInput, nullable: true }) input?: AdminListTeamRoleInput,
  ) {
    return this.service.adminTeamRoles(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTeamRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamRoleInput, nullable: true }) input?: AdminListTeamRoleInput,
  ) {
    return this.service.adminCountTeamRoles(admin.id, input)
  }





  @Query(() => TeamRole, { nullable: true })
  adminTeamRole(@CtxUser() admin: User, @Args('teamRoleId') teamRoleId: string) {
    return this.service.adminTeamRole(admin.id, teamRoleId)
  }

  @Mutation(() => TeamRole, { nullable: true })
  adminCreateTeamRole(@CtxUser() admin: User, @Args('input') input: AdminCreateTeamRoleInput,) {
    return this.service.adminCreateTeamRole(admin.id, input)
  }

  @Mutation(() => TeamRole, { nullable: true })
  adminUpdateTeamRole(
    @CtxUser() admin: User,
    @Args('teamRoleId') teamRoleId: string,
    @Args('input') input: AdminUpdateTeamRoleInput,
  ) {
    return this.service.adminUpdateTeamRole(admin.id, teamRoleId, input)
  }

  @Mutation(() => TeamRole, { nullable: true })
  adminDeleteTeamRole(@CtxUser() admin: User, @Args('teamRoleId') teamRoleId: string) {
    return this.service.adminDeleteTeamRole(admin.id, teamRoleId)
  }
}

