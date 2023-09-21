
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateEligibilityRequestInput,
  AdminListEligibilityRequestInput,
  AdminUpdateEligibilityRequestInput,
  ApiEligibilityRequestDataAccessAdminService,
  EligibilityRequest
} from '@case-clinical/api/eligibility-request/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListEligibilityStatusInput, EligibilityStatus } from '@case-clinical/api/eligibility-status/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiEligibilityRequestFeatureAdminResolver {
  constructor(private readonly service: ApiEligibilityRequestDataAccessAdminService) {}

  @Query(() => [EligibilityRequest], { nullable: true })
  adminEligibilityRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEligibilityRequestInput, nullable: true }) input?: AdminListEligibilityRequestInput,
  ) {
    return this.service.adminEligibilityRequests(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountEligibilityRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEligibilityRequestInput, nullable: true }) input?: AdminListEligibilityRequestInput,
  ) {
    return this.service.adminCountEligibilityRequests(admin.id, input)
  }





  @Query(() => EligibilityRequest, { nullable: true })
  adminEligibilityRequest(@CtxUser() admin: User, @Args('eligibilityRequestId') eligibilityRequestId: string) {
    return this.service.adminEligibilityRequest(admin.id, eligibilityRequestId)
  }

  @Mutation(() => EligibilityRequest, { nullable: true })
  adminCreateEligibilityRequest(@CtxUser() admin: User, @Args('input') input: AdminCreateEligibilityRequestInput,) {
    return this.service.adminCreateEligibilityRequest(admin.id, input)
  }

  @Mutation(() => EligibilityRequest, { nullable: true })
  adminUpdateEligibilityRequest(
    @CtxUser() admin: User,
    @Args('eligibilityRequestId') eligibilityRequestId: string,
    @Args('input') input: AdminUpdateEligibilityRequestInput,
  ) {
    return this.service.adminUpdateEligibilityRequest(admin.id, eligibilityRequestId, input)
  }

  @Mutation(() => EligibilityRequest, { nullable: true })
  adminDeleteEligibilityRequest(@CtxUser() admin: User, @Args('eligibilityRequestId') eligibilityRequestId: string) {
    return this.service.adminDeleteEligibilityRequest(admin.id, eligibilityRequestId)
  }
}

