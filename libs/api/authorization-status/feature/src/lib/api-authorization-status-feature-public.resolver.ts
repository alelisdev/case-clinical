
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAuthorizationStatusInput,
  ApiAuthorizationStatusDataAccessPublicService,
  AuthorizationStatus,
} from '@case-clinical/api/authorization-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAuthorizationStatusFeaturePublicResolver {
  constructor(private readonly service: ApiAuthorizationStatusDataAccessPublicService) {}
           
  @Query(() => [AuthorizationStatus], { nullable: true })
  publicAuthorizationStatuses(
    @Args({ name: 'input', type: () => UserListAuthorizationStatusInput, nullable: true }) input?: UserListAuthorizationStatusInput,
  ) {
    return this.service.publicAuthorizationStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAuthorizationStatuses(
    @Args({ name: 'input', type: () => UserListAuthorizationStatusInput, nullable: true }) input?: UserListAuthorizationStatusInput,
  ) {
    return this.service.publicCountAuthorizationStatuses(input)
  }

  @Query(() => [AuthorizationStatus], { nullable: true })
  publicSelectAuthorizationStatuses(
    @Args({ name: 'input', type: () => UserListAuthorizationStatusInput, nullable: true }) input?: UserListAuthorizationStatusInput,
  ) {
    return this.service.publicSelectAuthorizationStatuses(input)
  }

  @Query(() => AuthorizationStatus, { nullable: true })
  publicAuthorizationStatus(@Args('authorizationStatusId') authorizationStatusId: string) {
    return this.service.publicAuthorizationStatus(authorizationStatusId)
  }
}
