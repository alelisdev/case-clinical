import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorMedsToDateStatusInput } from './user-update-prior-meds-to-date-status.input'

@InputType()
export class UserUpdatePriorMedsToDateStatusesInput {
  @Field(() => [UserUpdatePriorMedsToDateStatusInput], {nullable: true }) 
  priorMedsToDateStatuses: UserUpdatePriorMedsToDateStatusInput[]
}
