import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFeeScheduleInput } from '@case-clinical/api/fee-schedule/data-access' 
import { UserCreateFacilityFeeScheduleInput } from '@case-clinical/api/facility-fee-schedule/data-access' 
import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 


@InputType()
export class UserCreateOrganizationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateFeeScheduleInput], { nullable: true }) 
  feeSchedules?: UserCreateFeeScheduleInput[]

  @Field(() => [UserCreateFacilityFeeScheduleInput], { nullable: true }) 
  facilityFeeSchedules?: UserCreateFacilityFeeScheduleInput[]

  @Field(() => [UserCreateContractInput], { nullable: true }) 
  contracts?: UserCreateContractInput[]

  @Field(() => [UserCreateContractInput], { nullable: true }) 
  liensHeld?: UserCreateContractInput[]


}
