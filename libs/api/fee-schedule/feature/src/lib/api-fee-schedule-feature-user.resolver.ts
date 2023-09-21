
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateFeeScheduleInput,
  UserListFeeScheduleInput,
  UserUpdateFeeScheduleInput,
  UserUpdateFeeSchedulesInput,
  ApiFeeScheduleDataAccessUserService,
  FeeSchedule,
} from '@case-clinical/api/fee-schedule/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListOrganizationInput, Organization } from '@case-clinical/api/organization/data-access'
import { UserListSpecialtyInput, Specialty } from '@case-clinical/api/specialty/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiFeeScheduleFeatureUserResolver {
  constructor(private readonly service: ApiFeeScheduleDataAccessUserService) {}

  @Query(() => [FeeSchedule], { nullable: true })
  userFeeSchedules(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeeScheduleInput, nullable: true }) input?: UserListFeeScheduleInput,
  ) {
    return this.service.userFeeSchedules(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountFeeSchedules(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeeScheduleInput, nullable: true }) input?: UserListFeeScheduleInput,
  ) {
    return this.service.userCountFeeSchedules(user.id, input)
  }

  @Query(() => [FeeSchedule], { nullable: true })
  userSelectFeeSchedules(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFeeScheduleInput, nullable: true }) input?: UserListFeeScheduleInput,
  ) {
    return this.service.userSelectFeeSchedules(user.id, input)
  }







  @Query(() => FeeSchedule, { nullable: true })
  userFeeSchedule(@CtxUser() user: User, @Args('feeScheduleId') feeScheduleId: string) {
    return this.service.userFeeSchedule(user.id, feeScheduleId)
  }

  @Mutation(() => FeeSchedule, { nullable: true })
  userCreateFeeSchedule(@CtxUser() user: User, @Args('input') input: UserCreateFeeScheduleInput,) {
    return this.service.userCreateFeeSchedule(user.id, input)
  }

  @Mutation(() => FeeSchedule, { nullable: true })
  userUpdateFeeSchedule(
    @CtxUser() user: User,
    @Args('feeScheduleId') feeScheduleId: string,
    @Args('input') input: UserUpdateFeeScheduleInput,
  ) {
    return this.service.userUpdateFeeSchedule(user.id, feeScheduleId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateFeeSchedules(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateFeeSchedulesInput,
  ) {
    return this.service.userUpdateFeeSchedules(user.id, input)
  }

  @Mutation(() => FeeSchedule, { nullable: true })
  userDeleteFeeSchedule(@CtxUser() user: User, @Args('feeScheduleId') feeScheduleId: string) {
    return this.service.userDeleteFeeSchedule(user.id, feeScheduleId)
  }
}

