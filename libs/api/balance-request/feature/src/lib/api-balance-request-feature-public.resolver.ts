
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBalanceRequestInput,
  ApiBalanceRequestDataAccessPublicService,
  BalanceRequest,
} from '@case-clinical/api/balance-request/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiBalanceRequestFeaturePublicResolver {
  constructor(private readonly service: ApiBalanceRequestDataAccessPublicService) {}
           
  @Query(() => [BalanceRequest], { nullable: true })
  publicBalanceRequests(
    @Args({ name: 'input', type: () => UserListBalanceRequestInput, nullable: true }) input?: UserListBalanceRequestInput,
  ) {
    return this.service.publicBalanceRequests(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBalanceRequests(
    @Args({ name: 'input', type: () => UserListBalanceRequestInput, nullable: true }) input?: UserListBalanceRequestInput,
  ) {
    return this.service.publicCountBalanceRequests(input)
  }

  @Query(() => [BalanceRequest], { nullable: true })
  publicSelectBalanceRequests(
    @Args({ name: 'input', type: () => UserListBalanceRequestInput, nullable: true }) input?: UserListBalanceRequestInput,
  ) {
    return this.service.publicSelectBalanceRequests(input)
  }

  @Query(() => BalanceRequest, { nullable: true })
  publicBalanceRequest(@Args('balanceRequestId') balanceRequestId: string) {
    return this.service.publicBalanceRequest(balanceRequestId)
  }
}
