
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAuthorizationInput,
  ApiAuthorizationDataAccessPublicService,
  Authorization,
} from '@case-clinical/api/authorization/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAuthorizationFeaturePublicResolver {
  constructor(private readonly service: ApiAuthorizationDataAccessPublicService) {}
           
  @Query(() => [Authorization], { nullable: true })
  publicAuthorizations(
    @Args({ name: 'input', type: () => UserListAuthorizationInput, nullable: true }) input?: UserListAuthorizationInput,
  ) {
    return this.service.publicAuthorizations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAuthorizations(
    @Args({ name: 'input', type: () => UserListAuthorizationInput, nullable: true }) input?: UserListAuthorizationInput,
  ) {
    return this.service.publicCountAuthorizations(input)
  }

  @Query(() => [Authorization], { nullable: true })
  publicSelectAuthorizations(
    @Args({ name: 'input', type: () => UserListAuthorizationInput, nullable: true }) input?: UserListAuthorizationInput,
  ) {
    return this.service.publicSelectAuthorizations(input)
  }

  @Query(() => Authorization, { nullable: true })
  publicAuthorization(@Args('authorizationId') authorizationId: string) {
    return this.service.publicAuthorization(authorizationId)
  }
}
