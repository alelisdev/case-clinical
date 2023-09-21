
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListEligibilityStatusInput,
  ApiEligibilityStatusDataAccessPublicService,
  EligibilityStatus,
} from '@case-clinical/api/eligibility-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiEligibilityStatusFeaturePublicResolver {
  constructor(private readonly service: ApiEligibilityStatusDataAccessPublicService) {}
           
  @Query(() => [EligibilityStatus], { nullable: true })
  publicEligibilityStatuses(
    @Args({ name: 'input', type: () => UserListEligibilityStatusInput, nullable: true }) input?: UserListEligibilityStatusInput,
  ) {
    return this.service.publicEligibilityStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountEligibilityStatuses(
    @Args({ name: 'input', type: () => UserListEligibilityStatusInput, nullable: true }) input?: UserListEligibilityStatusInput,
  ) {
    return this.service.publicCountEligibilityStatuses(input)
  }

  @Query(() => [EligibilityStatus], { nullable: true })
  publicSelectEligibilityStatuses(
    @Args({ name: 'input', type: () => UserListEligibilityStatusInput, nullable: true }) input?: UserListEligibilityStatusInput,
  ) {
    return this.service.publicSelectEligibilityStatuses(input)
  }

  @Query(() => EligibilityStatus, { nullable: true })
  publicEligibilityStatus(@Args('eligibilityStatusId') eligibilityStatusId: string) {
    return this.service.publicEligibilityStatus(eligibilityStatusId)
  }
}
