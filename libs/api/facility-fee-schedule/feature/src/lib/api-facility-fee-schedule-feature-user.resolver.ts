
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateFacilityFeeScheduleInput,
  UserListFacilityFeeScheduleInput,
  UserUpdateFacilityFeeScheduleInput,
  UserUpdateFacilityFeeSchedulesInput,
  ApiFacilityFeeScheduleDataAccessUserService,
  FacilityFeeSchedule,
} from '@case-clinical/api/facility-fee-schedule/data-access'
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
export class ApiFacilityFeeScheduleFeatureUserResolver {
  constructor(private readonly service: ApiFacilityFeeScheduleDataAccessUserService) {}

  @Query(() => [FacilityFeeSchedule], { nullable: true })
  userFacilityFeeSchedules(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFacilityFeeScheduleInput, nullable: true }) input?: UserListFacilityFeeScheduleInput,
  ) {
    return this.service.userFacilityFeeSchedules(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountFacilityFeeSchedules(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFacilityFeeScheduleInput, nullable: true }) input?: UserListFacilityFeeScheduleInput,
  ) {
    return this.service.userCountFacilityFeeSchedules(user.id, input)
  }

  @Query(() => [FacilityFeeSchedule], { nullable: true })
  userSelectFacilityFeeSchedules(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFacilityFeeScheduleInput, nullable: true }) input?: UserListFacilityFeeScheduleInput,
  ) {
    return this.service.userSelectFacilityFeeSchedules(user.id, input)
  }







  @Query(() => FacilityFeeSchedule, { nullable: true })
  userFacilityFeeSchedule(@CtxUser() user: User, @Args('facilityFeeScheduleId') facilityFeeScheduleId: string) {
    return this.service.userFacilityFeeSchedule(user.id, facilityFeeScheduleId)
  }

  @Mutation(() => FacilityFeeSchedule, { nullable: true })
  userCreateFacilityFeeSchedule(@CtxUser() user: User, @Args('input') input: UserCreateFacilityFeeScheduleInput,) {
    return this.service.userCreateFacilityFeeSchedule(user.id, input)
  }

  @Mutation(() => FacilityFeeSchedule, { nullable: true })
  userUpdateFacilityFeeSchedule(
    @CtxUser() user: User,
    @Args('facilityFeeScheduleId') facilityFeeScheduleId: string,
    @Args('input') input: UserUpdateFacilityFeeScheduleInput,
  ) {
    return this.service.userUpdateFacilityFeeSchedule(user.id, facilityFeeScheduleId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateFacilityFeeSchedules(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateFacilityFeeSchedulesInput,
  ) {
    return this.service.userUpdateFacilityFeeSchedules(user.id, input)
  }

  @Mutation(() => FacilityFeeSchedule, { nullable: true })
  userDeleteFacilityFeeSchedule(@CtxUser() user: User, @Args('facilityFeeScheduleId') facilityFeeScheduleId: string) {
    return this.service.userDeleteFacilityFeeSchedule(user.id, facilityFeeScheduleId)
  }
}

