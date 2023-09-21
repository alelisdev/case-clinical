import { Field, ObjectType } from '@nestjs/graphql'

import { FeeSchedule } from '@case-clinical/api/fee-schedule/data-access' 
import { ClinicalProviderSpecialty } from '@case-clinical/api/clinical-provider-specialty/data-access' 
import { FacilityFeeSchedule } from '@case-clinical/api/facility-fee-schedule/data-access' 


@ObjectType()
export class Specialty {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  active?: boolean

  @Field(() => [FeeSchedule], { nullable: true }) 
  feeSchedules?: FeeSchedule[]

  @Field(() => [ClinicalProviderSpecialty], { nullable: true }) 
  clinicalProviderSpecialties?: ClinicalProviderSpecialty[]

  @Field(() => [FacilityFeeSchedule], { nullable: true }) 
  facilityFeeSchedules?: FacilityFeeSchedule[]


}
