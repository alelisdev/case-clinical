
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorAuthorizationRequestInput,
  ApiPriorAuthorizationRequestDataAccessPublicService,
  PriorAuthorizationRequest,
} from '@case-clinical/api/prior-authorization-request/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorAuthorizationRequestFeaturePublicResolver {
  constructor(private readonly service: ApiPriorAuthorizationRequestDataAccessPublicService) {}
           
  @Query(() => [PriorAuthorizationRequest], { nullable: true })
  publicPriorAuthorizationRequests(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationRequestInput, nullable: true }) input?: UserListPriorAuthorizationRequestInput,
  ) {
    return this.service.publicPriorAuthorizationRequests(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorAuthorizationRequests(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationRequestInput, nullable: true }) input?: UserListPriorAuthorizationRequestInput,
  ) {
    return this.service.publicCountPriorAuthorizationRequests(input)
  }

  @Query(() => [PriorAuthorizationRequest], { nullable: true })
  publicSelectPriorAuthorizationRequests(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationRequestInput, nullable: true }) input?: UserListPriorAuthorizationRequestInput,
  ) {
    return this.service.publicSelectPriorAuthorizationRequests(input)
  }

  @Query(() => PriorAuthorizationRequest, { nullable: true })
  publicPriorAuthorizationRequest(@Args('priorAuthorizationRequestId') priorAuthorizationRequestId: string) {
    return this.service.publicPriorAuthorizationRequest(priorAuthorizationRequestId)
  }
}
