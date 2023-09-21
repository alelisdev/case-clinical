
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateFeeScheduleInput,
  AdminListFeeScheduleInput,
  AdminUpdateFeeScheduleInput,
  ApiFeeScheduleDataAccessAdminService,
  FeeSchedule
} from '@case-clinical/api/fee-schedule/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListOrganizationInput, Organization } from '@case-clinical/api/organization/data-access'
import { AdminListSpecialtyInput, Specialty } from '@case-clinical/api/specialty/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiFeeScheduleFeatureAdminResolver {
  constructor(private readonly service: ApiFeeScheduleDataAccessAdminService) {}

  @Query(() => [FeeSchedule], { nullable: true })
  adminFeeSchedules(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFeeScheduleInput, nullable: true }) input?: AdminListFeeScheduleInput,
  ) {
    return this.service.adminFeeSchedules(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountFeeSchedules(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFeeScheduleInput, nullable: true }) input?: AdminListFeeScheduleInput,
  ) {
    return this.service.adminCountFeeSchedules(admin.id, input)
  }





  @Query(() => FeeSchedule, { nullable: true })
  adminFeeSchedule(@CtxUser() admin: User, @Args('feeScheduleId') feeScheduleId: string) {
    return this.service.adminFeeSchedule(admin.id, feeScheduleId)
  }

  @Mutation(() => FeeSchedule, { nullable: true })
  adminCreateFeeSchedule(@CtxUser() admin: User, @Args('input') input: AdminCreateFeeScheduleInput,) {
    return this.service.adminCreateFeeSchedule(admin.id, input)
  }

  @Mutation(() => FeeSchedule, { nullable: true })
  adminUpdateFeeSchedule(
    @CtxUser() admin: User,
    @Args('feeScheduleId') feeScheduleId: string,
    @Args('input') input: AdminUpdateFeeScheduleInput,
  ) {
    return this.service.adminUpdateFeeSchedule(admin.id, feeScheduleId, input)
  }

  @Mutation(() => FeeSchedule, { nullable: true })
  adminDeleteFeeSchedule(@CtxUser() admin: User, @Args('feeScheduleId') feeScheduleId: string) {
    return this.service.adminDeleteFeeSchedule(admin.id, feeScheduleId)
  }
}

