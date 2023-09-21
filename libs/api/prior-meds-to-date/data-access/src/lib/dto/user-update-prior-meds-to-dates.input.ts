import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorMedsToDateInput } from './user-update-prior-meds-to-date.input'

@InputType()
export class UserUpdatePriorMedsToDatesInput {
  @Field(() => [UserUpdatePriorMedsToDateInput], {nullable: true }) 
  priorMedsToDates: UserUpdatePriorMedsToDateInput[]
}
