import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFeeScheduleInput } from '@case-clinical/api/fee-schedule/data-access' 
import { UserUpdateFacilityFeeScheduleInput } from '@case-clinical/api/facility-fee-schedule/data-access' 
import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class UserUpdateOrganizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateFeeScheduleInput], { nullable: true }) 
  feeSchedules?: UserUpdateFeeScheduleInput[]

  @Field(() => [UserUpdateFacilityFeeScheduleInput], { nullable: true }) 
  facilityFeeSchedules?: UserUpdateFacilityFeeScheduleInput[]

  @Field(() => [UserUpdateContractInput], { nullable: true }) 
  contracts?: UserUpdateContractInput[]

  @Field(() => [UserUpdateContractInput], { nullable: true }) 
  liensHeld?: UserUpdateContractInput[]


}