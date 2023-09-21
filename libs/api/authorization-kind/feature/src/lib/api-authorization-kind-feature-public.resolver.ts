
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAuthorizationKindInput,
  ApiAuthorizationKindDataAccessPublicService,
  AuthorizationKind,
} from '@case-clinical/api/authorization-kind/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAuthorizationKindFeaturePublicResolver {
  constructor(private readonly service: ApiAuthorizationKindDataAccessPublicService) {}
           
  @Query(() => [AuthorizationKind], { nullable: true })
  publicAuthorizationKinds(
    @Args({ name: 'input', type: () => UserListAuthorizationKindInput, nullable: true }) input?: UserListAuthorizationKindInput,
  ) {
    return this.service.publicAuthorizationKinds(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAuthorizationKinds(
    @Args({ name: 'input', type: () => UserListAuthorizationKindInput, nullable: true }) input?: UserListAuthorizationKindInput,
  ) {
    return this.service.publicCountAuthorizationKinds(input)
  }

  @Query(() => [AuthorizationKind], { nullable: true })
  publicSelectAuthorizationKinds(
    @Args({ name: 'input', type: () => UserListAuthorizationKindInput, nullable: true }) input?: UserListAuthorizationKindInput,
  ) {
    return this.service.publicSelectAuthorizationKinds(input)
  }

  @Query(() => AuthorizationKind, { nullable: true })
  publicAuthorizationKind(@Args('authorizationKindId') authorizationKindId: string) {
    return this.service.publicAuthorizationKind(authorizationKindId)
  }
}
