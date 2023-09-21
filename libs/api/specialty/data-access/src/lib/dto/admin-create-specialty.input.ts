import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeeScheduleInput } from '@case-clinical/api/fee-schedule/data-access' 
import { AdminCreateClinicalProviderSpecialtyInput } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { AdminCreateFacilityFeeScheduleInput } from '@case-clinical/api/facility-fee-schedule/data-access' 


@InputType()
export class AdminCreateSpecialtyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  active?: boolean

  @Field(() => [AdminCreateFeeScheduleInput], { nullable: true }) 
  feeSchedules?: AdminCreateFeeScheduleInput[]

  @Field(() => [AdminCreateClinicalProviderSpecialtyInput], { nullable: true }) 
  clinicalProviderSpecialties?: AdminCreateClinicalProviderSpecialtyInput[]

  @Field(() => [AdminCreateFacilityFeeScheduleInput], { nullable: true }) 
  facilityFeeSchedules?: AdminCreateFacilityFeeScheduleInput[]


}