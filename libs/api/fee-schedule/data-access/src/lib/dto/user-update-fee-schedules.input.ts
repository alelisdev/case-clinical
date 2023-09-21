import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateFeeScheduleInput } from './user-update-fee-schedule.input'

@InputType()
export class UserUpdateFeeSchedulesInput {
  @Field(() => [UserUpdateFeeScheduleInput], {nullable: true }) 
  feeSchedules: UserUpdateFeeScheduleInput[]
}
