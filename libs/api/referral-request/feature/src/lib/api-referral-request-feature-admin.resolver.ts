
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateReferralRequestInput,
  AdminListReferralRequestInput,
  AdminUpdateReferralRequestInput,
  ApiReferralRequestDataAccessAdminService,
  ReferralRequest
} from '@case-clinical/api/referral-request/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListClinicalProviderLocationInput, ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiReferralRequestFeatureAdminResolver {
  constructor(private readonly service: ApiReferralRequestDataAccessAdminService) {}

  @Query(() => [ReferralRequest], { nullable: true })
  adminReferralRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListReferralRequestInput, nullable: true }) input?: AdminListReferralRequestInput,
  ) {
    return this.service.adminReferralRequests(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountReferralRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListReferralRequestInput, nullable: true }) input?: AdminListReferralRequestInput,
  ) {
    return this.service.adminCountReferralRequests(admin.id, input)
  }





  @Query(() => ReferralRequest, { nullable: true })
  adminReferralRequest(@CtxUser() admin: User, @Args('referralRequestId') referralRequestId: string) {
    return this.service.adminReferralRequest(admin.id, referralRequestId)
  }

  @Mutation(() => ReferralRequest, { nullable: true })
  adminCreateReferralRequest(@CtxUser() admin: User, @Args('input') input: AdminCreateReferralRequestInput,) {
    return this.service.adminCreateReferralRequest(admin.id, input)
  }

  @Mutation(() => ReferralRequest, { nullable: true })
  adminUpdateReferralRequest(
    @CtxUser() admin: User,
    @Args('referralRequestId') referralRequestId: string,
    @Args('input') input: AdminUpdateReferralRequestInput,
  ) {
    return this.service.adminUpdateReferralRequest(admin.id, referralRequestId, input)
  }

  @Mutation(() => ReferralRequest, { nullable: true })
  adminDeleteReferralRequest(@CtxUser() admin: User, @Args('referralRequestId') referralRequestId: string) {
    return this.service.adminDeleteReferralRequest(admin.id, referralRequestId)
  }
}

