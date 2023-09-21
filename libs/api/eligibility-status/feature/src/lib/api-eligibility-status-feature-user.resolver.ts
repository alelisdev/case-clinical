
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateEligibilityStatusInput,
  UserListEligibilityStatusInput,
  UserUpdateEligibilityStatusInput,
  UserUpdateEligibilityStatusesInput,
  ApiEligibilityStatusDataAccessUserService,
  EligibilityStatus,
} from '@case-clinical/api/eligibility-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiEligibilityStatusFeatureUserResolver {
  constructor(private readonly service: ApiEligibilityStatusDataAccessUserService) {}

  @Query(() => [EligibilityStatus], { nullable: true })
  userEligibilityStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEligibilityStatusInput, nullable: true }) input?: UserListEligibilityStatusInput,
  ) {
    return this.service.userEligibilityStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountEligibilityStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEligibilityStatusInput, nullable: true }) input?: UserListEligibilityStatusInput,
  ) {
    return this.service.userCountEligibilityStatuses(user.id, input)
  }

  @Query(() => [EligibilityStatus], { nullable: true })
  userSelectEligibilityStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEligibilityStatusInput, nullable: true }) input?: UserListEligibilityStatusInput,
  ) {
    return this.service.userSelectEligibilityStatuses(user.id, input)
  }







  @Query(() => EligibilityStatus, { nullable: true })
  userEligibilityStatus(@CtxUser() user: User, @Args('eligibilityStatusId') eligibilityStatusId: string) {
    return this.service.userEligibilityStatus(user.id, eligibilityStatusId)
  }

  @Mutation(() => EligibilityStatus, { nullable: true })
  userCreateEligibilityStatus(@CtxUser() user: User, @Args('input') input: UserCreateEligibilityStatusInput,) {
    return this.service.userCreateEligibilityStatus(user.id, input)
  }

  @Mutation(() => EligibilityStatus, { nullable: true })
  userUpdateEligibilityStatus(
    @CtxUser() user: User,
    @Args('eligibilityStatusId') eligibilityStatusId: string,
    @Args('input') input: UserUpdateEligibilityStatusInput,
  ) {
    return this.service.userUpdateEligibilityStatus(user.id, eligibilityStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateEligibilityStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateEligibilityStatusesInput,
  ) {
    return this.service.userUpdateEligibilityStatuses(user.id, input)
  }

  @Mutation(() => EligibilityStatus, { nullable: true })
  userDeleteEligibilityStatus(@CtxUser() user: User, @Args('eligibilityStatusId') eligibilityStatusId: string) {
    return this.service.userDeleteEligibilityStatus(user.id, eligibilityStatusId)
  }
}

