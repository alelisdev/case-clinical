import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeeScheduleInput } from '@case-clinical/api/fee-schedule/data-access' 
import { AdminCreateFacilityFeeScheduleInput } from '@case-clinical/api/facility-fee-schedule/data-access' 
import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class AdminCreateOrganizationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateFeeScheduleInput], { nullable: true }) 
  feeSchedules?: AdminCreateFeeScheduleInput[]

  @Field(() => [AdminCreateFacilityFeeScheduleInput], { nullable: true }) 
  facilityFeeSchedules?: AdminCreateFacilityFeeScheduleInput[]

  @Field(() => [AdminCreateContractInput], { nullable: true }) 
  contracts?: AdminCreateContractInput[]

  @Field(() => [AdminCreateContractInput], { nullable: true }) 
  liensHeld?: AdminCreateContractInput[]


}