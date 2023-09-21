
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAuthorizationTypeInput,
  ApiAuthorizationTypeDataAccessPublicService,
  AuthorizationType,
} from '@case-clinical/api/authorization-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAuthorizationTypeFeaturePublicResolver {
  constructor(private readonly service: ApiAuthorizationTypeDataAccessPublicService) {}
           
  @Query(() => [AuthorizationType], { nullable: true })
  publicAuthorizationTypes(
    @Args({ name: 'input', type: () => UserListAuthorizationTypeInput, nullable: true }) input?: UserListAuthorizationTypeInput,
  ) {
    return this.service.publicAuthorizationTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAuthorizationTypes(
    @Args({ name: 'input', type: () => UserListAuthorizationTypeInput, nullable: true }) input?: UserListAuthorizationTypeInput,
  ) {
    return this.service.publicCountAuthorizationTypes(input)
  }

  @Query(() => [AuthorizationType], { nullable: true })
  publicSelectAuthorizationTypes(
    @Args({ name: 'input', type: () => UserListAuthorizationTypeInput, nullable: true }) input?: UserListAuthorizationTypeInput,
  ) {
    return this.service.publicSelectAuthorizationTypes(input)
  }

  @Query(() => AuthorizationType, { nullable: true })
  publicAuthorizationType(@Args('authorizationTypeId') authorizationTypeId: string) {
    return this.service.publicAuthorizationType(authorizationTypeId)
  }
}
