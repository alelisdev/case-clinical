
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRoleInput,
  ApiRoleDataAccessPublicService,
  Role,
} from '@case-clinical/api/role/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRoleFeaturePublicResolver {
  constructor(private readonly service: ApiRoleDataAccessPublicService) {}
           
  @Query(() => [Role], { nullable: true })
  publicRoles(
    @Args({ name: 'input', type: () => UserListRoleInput, nullable: true }) input?: UserListRoleInput,
  ) {
    return this.service.publicRoles(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRoles(
    @Args({ name: 'input', type: () => UserListRoleInput, nullable: true }) input?: UserListRoleInput,
  ) {
    return this.service.publicCountRoles(input)
  }

  @Query(() => [Role], { nullable: true })
  publicSelectRoles(
    @Args({ name: 'input', type: () => UserListRoleInput, nullable: true }) input?: UserListRoleInput,
  ) {
    return this.service.publicSelectRoles(input)
  }

  @Query(() => Role, { nullable: true })
  publicRole(@Args('roleId') roleId: string) {
    return this.service.publicRole(roleId)
  }
}
