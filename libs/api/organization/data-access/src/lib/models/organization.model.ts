import { Field, ObjectType } from '@nestjs/graphql'

import { FeeSchedule } from '@case-clinical/api/fee-schedule/data-access' 
import { FacilityFeeSchedule } from '@case-clinical/api/facility-fee-schedule/data-access' 
import { Contract } from '@case-clinical/api/contract/data-access' 


@ObjectType()
export class Organization {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [FeeSchedule], { nullable: true }) 
  feeSchedules?: FeeSchedule[]

  @Field(() => [FacilityFeeSchedule], { nullable: true }) 
  facilityFeeSchedules?: FacilityFeeSchedule[]

  @Field(() => [Contract], { nullable: true }) 
  contracts?: Contract[]

  @Field(() => [Contract], { nullable: true }) 
  liensHeld?: Contract[]


}
