
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListFeeScheduleInput,
  ApiFeeScheduleDataAccessPublicService,
  FeeSchedule,
} from '@case-clinical/api/fee-schedule/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiFeeScheduleFeaturePublicResolver {
  constructor(private readonly service: ApiFeeScheduleDataAccessPublicService) {}
           
  @Query(() => [FeeSchedule], { nullable: true })
  publicFeeSchedules(
    @Args({ name: 'input', type: () => UserListFeeScheduleInput, nullable: true }) input?: UserListFeeScheduleInput,
  ) {
    return this.service.publicFeeSchedules(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountFeeSchedules(
    @Args({ name: 'input', type: () => UserListFeeScheduleInput, nullable: true }) input?: UserListFeeScheduleInput,
  ) {
    return this.service.publicCountFeeSchedules(input)
  }

  @Query(() => [FeeSchedule], { nullable: true })
  publicSelectFeeSchedules(
    @Args({ name: 'input', type: () => UserListFeeScheduleInput, nullable: true }) input?: UserListFeeScheduleInput,
  ) {
    return this.service.publicSelectFeeSchedules(input)
  }

  @Query(() => FeeSchedule, { nullable: true })
  publicFeeSchedule(@Args('feeScheduleId') feeScheduleId: string) {
    return this.service.publicFeeSchedule(feeScheduleId)
  }
}
