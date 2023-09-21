
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListEligibilityRequestInput,
  ApiEligibilityRequestDataAccessPublicService,
  EligibilityRequest,
} from '@case-clinical/api/eligibility-request/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiEligibilityRequestFeaturePublicResolver {
  constructor(private readonly service: ApiEligibilityRequestDataAccessPublicService) {}
           
  @Query(() => [EligibilityRequest], { nullable: true })
  publicEligibilityRequests(
    @Args({ name: 'input', type: () => UserListEligibilityRequestInput, nullable: true }) input?: UserListEligibilityRequestInput,
  ) {
    return this.service.publicEligibilityRequests(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountEligibilityRequests(
    @Args({ name: 'input', type: () => UserListEligibilityRequestInput, nullable: true }) input?: UserListEligibilityRequestInput,
  ) {
    return this.service.publicCountEligibilityRequests(input)
  }

  @Query(() => [EligibilityRequest], { nullable: true })
  publicSelectEligibilityRequests(
    @Args({ name: 'input', type: () => UserListEligibilityRequestInput, nullable: true }) input?: UserListEligibilityRequestInput,
  ) {
    return this.service.publicSelectEligibilityRequests(input)
  }

  @Query(() => EligibilityRequest, { nullable: true })
  publicEligibilityRequest(@Args('eligibilityRequestId') eligibilityRequestId: string) {
    return this.service.publicEligibilityRequest(eligibilityRequestId)
  }
}
