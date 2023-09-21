import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateFacilityFeeScheduleInput } from './user-update-facility-fee-schedule.input'

@InputType()
export class UserUpdateFacilityFeeSchedulesInput {
  @Field(() => [UserUpdateFacilityFeeScheduleInput], {nullable: true }) 
  facilityFeeSchedules: UserUpdateFacilityFeeScheduleInput[]
}
