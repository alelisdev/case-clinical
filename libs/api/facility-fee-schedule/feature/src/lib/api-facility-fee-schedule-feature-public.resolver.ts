
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListFacilityFeeScheduleInput,
  ApiFacilityFeeScheduleDataAccessPublicService,
  FacilityFeeSchedule,
} from '@case-clinical/api/facility-fee-schedule/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiFacilityFeeScheduleFeaturePublicResolver {
  constructor(private readonly service: ApiFacilityFeeScheduleDataAccessPublicService) {}
           
  @Query(() => [FacilityFeeSchedule], { nullable: true })
  publicFacilityFeeSchedules(
    @Args({ name: 'input', type: () => UserListFacilityFeeScheduleInput, nullable: true }) input?: UserListFacilityFeeScheduleInput,
  ) {
    return this.service.publicFacilityFeeSchedules(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountFacilityFeeSchedules(
    @Args({ name: 'input', type: () => UserListFacilityFeeScheduleInput, nullable: true }) input?: UserListFacilityFeeScheduleInput,
  ) {
    return this.service.publicCountFacilityFeeSchedules(input)
  }

  @Query(() => [FacilityFeeSchedule], { nullable: true })
  publicSelectFacilityFeeSchedules(
    @Args({ name: 'input', type: () => UserListFacilityFeeScheduleInput, nullable: true }) input?: UserListFacilityFeeScheduleInput,
  ) {
    return this.service.publicSelectFacilityFeeSchedules(input)
  }

  @Query(() => FacilityFeeSchedule, { nullable: true })
  publicFacilityFeeSchedule(@Args('facilityFeeScheduleId') facilityFeeScheduleId: string) {
    return this.service.publicFacilityFeeSchedule(facilityFeeScheduleId)
  }
}
