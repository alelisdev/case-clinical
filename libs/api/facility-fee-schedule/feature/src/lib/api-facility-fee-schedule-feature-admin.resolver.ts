
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateFacilityFeeScheduleInput,
  AdminListFacilityFeeScheduleInput,
  AdminUpdateFacilityFeeScheduleInput,
  ApiFacilityFeeScheduleDataAccessAdminService,
  FacilityFeeSchedule
} from '@case-clinical/api/facility-fee-schedule/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListOrganizationInput, Organization } from '@case-clinical/api/organization/data-access'
import { AdminListSpecialtyInput, Specialty } from '@case-clinical/api/specialty/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiFacilityFeeScheduleFeatureAdminResolver {
  constructor(private readonly service: ApiFacilityFeeScheduleDataAccessAdminService) {}

  @Query(() => [FacilityFeeSchedule], { nullable: true })
  adminFacilityFeeSchedules(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFacilityFeeScheduleInput, nullable: true }) input?: AdminListFacilityFeeScheduleInput,
  ) {
    return this.service.adminFacilityFeeSchedules(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountFacilityFeeSchedules(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFacilityFeeScheduleInput, nullable: true }) input?: AdminListFacilityFeeScheduleInput,
  ) {
    return this.service.adminCountFacilityFeeSchedules(admin.id, input)
  }





  @Query(() => FacilityFeeSchedule, { nullable: true })
  adminFacilityFeeSchedule(@CtxUser() admin: User, @Args('facilityFeeScheduleId') facilityFeeScheduleId: string) {
    return this.service.adminFacilityFeeSchedule(admin.id, facilityFeeScheduleId)
  }

  @Mutation(() => FacilityFeeSchedule, { nullable: true })
  adminCreateFacilityFeeSchedule(@CtxUser() admin: User, @Args('input') input: AdminCreateFacilityFeeScheduleInput,) {
    return this.service.adminCreateFacilityFeeSchedule(admin.id, input)
  }

  @Mutation(() => FacilityFeeSchedule, { nullable: true })
  adminUpdateFacilityFeeSchedule(
    @CtxUser() admin: User,
    @Args('facilityFeeScheduleId') facilityFeeScheduleId: string,
    @Args('input') input: AdminUpdateFacilityFeeScheduleInput,
  ) {
    return this.service.adminUpdateFacilityFeeSchedule(admin.id, facilityFeeScheduleId, input)
  }

  @Mutation(() => FacilityFeeSchedule, { nullable: true })
  adminDeleteFacilityFeeSchedule(@CtxUser() admin: User, @Args('facilityFeeScheduleId') facilityFeeScheduleId: string) {
    return this.service.adminDeleteFacilityFeeSchedule(admin.id, facilityFeeScheduleId)
  }
}

