
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListReferralRequestInput,
  ApiReferralRequestDataAccessPublicService,
  ReferralRequest,
} from '@case-clinical/api/referral-request/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiReferralRequestFeaturePublicResolver {
  constructor(private readonly service: ApiReferralRequestDataAccessPublicService) {}
           
  @Query(() => [ReferralRequest], { nullable: true })
  publicReferralRequests(
    @Args({ name: 'input', type: () => UserListReferralRequestInput, nullable: true }) input?: UserListReferralRequestInput,
  ) {
    return this.service.publicReferralRequests(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountReferralRequests(
    @Args({ name: 'input', type: () => UserListReferralRequestInput, nullable: true }) input?: UserListReferralRequestInput,
  ) {
    return this.service.publicCountReferralRequests(input)
  }

  @Query(() => [ReferralRequest], { nullable: true })
  publicSelectReferralRequests(
    @Args({ name: 'input', type: () => UserListReferralRequestInput, nullable: true }) input?: UserListReferralRequestInput,
  ) {
    return this.service.publicSelectReferralRequests(input)
  }

  @Query(() => ReferralRequest, { nullable: true })
  publicReferralRequest(@Args('referralRequestId') referralRequestId: string) {
    return this.service.publicReferralRequest(referralRequestId)
  }
}
