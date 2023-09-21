
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateReferralRequestInput,
  UserListReferralRequestInput,
  UserUpdateReferralRequestInput,
  UserUpdateReferralRequestsInput,
  ApiReferralRequestDataAccessUserService,
  ReferralRequest,
} from '@case-clinical/api/referral-request/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { UserListClinicalProviderLocationInput, ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiReferralRequestFeatureUserResolver {
  constructor(private readonly service: ApiReferralRequestDataAccessUserService) {}

  @Query(() => [ReferralRequest], { nullable: true })
  userReferralRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReferralRequestInput, nullable: true }) input?: UserListReferralRequestInput,
  ) {
    return this.service.userReferralRequests(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountReferralRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReferralRequestInput, nullable: true }) input?: UserListReferralRequestInput,
  ) {
    return this.service.userCountReferralRequests(user.id, input)
  }

  @Query(() => [ReferralRequest], { nullable: true })
  userSelectReferralRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReferralRequestInput, nullable: true }) input?: UserListReferralRequestInput,
  ) {
    return this.service.userSelectReferralRequests(user.id, input)
  }







  @Query(() => ReferralRequest, { nullable: true })
  userReferralRequest(@CtxUser() user: User, @Args('referralRequestId') referralRequestId: string) {
    return this.service.userReferralRequest(user.id, referralRequestId)
  }

  @Mutation(() => ReferralRequest, { nullable: true })
  userCreateReferralRequest(@CtxUser() user: User, @Args('input') input: UserCreateReferralRequestInput,) {
    return this.service.userCreateReferralRequest(user.id, input)
  }

  @Mutation(() => ReferralRequest, { nullable: true })
  userUpdateReferralRequest(
    @CtxUser() user: User,
    @Args('referralRequestId') referralRequestId: string,
    @Args('input') input: UserUpdateReferralRequestInput,
  ) {
    return this.service.userUpdateReferralRequest(user.id, referralRequestId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateReferralRequests(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateReferralRequestsInput,
  ) {
    return this.service.userUpdateReferralRequests(user.id, input)
  }

  @Mutation(() => ReferralRequest, { nullable: true })
  userDeleteReferralRequest(@CtxUser() user: User, @Args('referralRequestId') referralRequestId: string) {
    return this.service.userDeleteReferralRequest(user.id, referralRequestId)
  }
}

