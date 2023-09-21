
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateEligibilityRequestInput,
  UserListEligibilityRequestInput,
  UserUpdateEligibilityRequestInput,
  UserUpdateEligibilityRequestsInput,
  ApiEligibilityRequestDataAccessUserService,
  EligibilityRequest,
} from '@case-clinical/api/eligibility-request/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListEligibilityStatusInput, EligibilityStatus } from '@case-clinical/api/eligibility-status/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiEligibilityRequestFeatureUserResolver {
  constructor(private readonly service: ApiEligibilityRequestDataAccessUserService) {}

  @Query(() => [EligibilityRequest], { nullable: true })
  userEligibilityRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEligibilityRequestInput, nullable: true }) input?: UserListEligibilityRequestInput,
  ) {
    return this.service.userEligibilityRequests(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountEligibilityRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEligibilityRequestInput, nullable: true }) input?: UserListEligibilityRequestInput,
  ) {
    return this.service.userCountEligibilityRequests(user.id, input)
  }

  @Query(() => [EligibilityRequest], { nullable: true })
  userSelectEligibilityRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEligibilityRequestInput, nullable: true }) input?: UserListEligibilityRequestInput,
  ) {
    return this.service.userSelectEligibilityRequests(user.id, input)
  }







  @Query(() => EligibilityRequest, { nullable: true })
  userEligibilityRequest(@CtxUser() user: User, @Args('eligibilityRequestId') eligibilityRequestId: string) {
    return this.service.userEligibilityRequest(user.id, eligibilityRequestId)
  }

  @Mutation(() => EligibilityRequest, { nullable: true })
  userCreateEligibilityRequest(@CtxUser() user: User, @Args('input') input: UserCreateEligibilityRequestInput,) {
    return this.service.userCreateEligibilityRequest(user.id, input)
  }

  @Mutation(() => EligibilityRequest, { nullable: true })
  userUpdateEligibilityRequest(
    @CtxUser() user: User,
    @Args('eligibilityRequestId') eligibilityRequestId: string,
    @Args('input') input: UserUpdateEligibilityRequestInput,
  ) {
    return this.service.userUpdateEligibilityRequest(user.id, eligibilityRequestId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateEligibilityRequests(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateEligibilityRequestsInput,
  ) {
    return this.service.userUpdateEligibilityRequests(user.id, input)
  }

  @Mutation(() => EligibilityRequest, { nullable: true })
  userDeleteEligibilityRequest(@CtxUser() user: User, @Args('eligibilityRequestId') eligibilityRequestId: string) {
    return this.service.userDeleteEligibilityRequest(user.id, eligibilityRequestId)
  }
}

