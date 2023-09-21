import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTreatmentInput } from './user-update-treatment.input'

@InputType()
export class UserUpdateTreatmentsInput {
  @Field(() => [UserUpdateTreatmentInput], {nullable: true }) 
  treatments: UserUpdateTreatmentInput[]
}
