import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFeeScheduleInput } from '@case-clinical/api/fee-schedule/data-access' 
import { UserCreateClinicalProviderSpecialtyInput } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { UserCreateFacilityFeeScheduleInput } from '@case-clinical/api/facility-fee-schedule/data-access' 


@InputType()
export class UserCreateSpecialtyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  active?: boolean

  @Field(() => [UserCreateFeeScheduleInput], { nullable: true }) 
  feeSchedules?: UserCreateFeeScheduleInput[]

  @Field(() => [UserCreateClinicalProviderSpecialtyInput], { nullable: true }) 
  clinicalProviderSpecialties?: UserCreateClinicalProviderSpecialtyInput[]

  @Field(() => [UserCreateFacilityFeeScheduleInput], { nullable: true }) 
  facilityFeeSchedules?: UserCreateFacilityFeeScheduleInput[]


}
