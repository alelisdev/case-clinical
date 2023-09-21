
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListUserRoleInput,
  ApiUserRoleDataAccessPublicService,
  UserRole,
} from '@case-clinical/api/user-role/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiUserRoleFeaturePublicResolver {
  constructor(private readonly service: ApiUserRoleDataAccessPublicService) {}
           
  @Query(() => [UserRole], { nullable: true })
  publicUserRoles(
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.publicUserRoles(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountUserRoles(
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.publicCountUserRoles(input)
  }

  @Query(() => [UserRole], { nullable: true })
  publicSelectUserRoles(
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.publicSelectUserRoles(input)
  }

  @Query(() => UserRole, { nullable: true })
  publicUserRole(@Args('userRoleId') userRoleId: string) {
    return this.service.publicUserRole(userRoleId)
  }
}
