import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFeeScheduleInput } from '@case-clinical/api/fee-schedule/data-access' 
import { UserUpdateClinicalProviderSpecialtyInput } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { UserUpdateFacilityFeeScheduleInput } from '@case-clinical/api/facility-fee-schedule/data-access' 


@InputType()
export class UserUpdateSpecialtyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  active?: boolean

  @Field(() => [UserUpdateFeeScheduleInput], { nullable: true }) 
  feeSchedules?: UserUpdateFeeScheduleInput[]

  @Field(() => [UserUpdateClinicalProviderSpecialtyInput], { nullable: true }) 
  clinicalProviderSpecialties?: UserUpdateClinicalProviderSpecialtyInput[]

  @Field(() => [UserUpdateFacilityFeeScheduleInput], { nullable: true }) 
  facilityFeeSchedules?: UserUpdateFacilityFeeScheduleInput[]


}