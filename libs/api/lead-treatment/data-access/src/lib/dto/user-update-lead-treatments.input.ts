import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLeadTreatmentInput } from './user-update-lead-treatment.input'

@InputType()
export class UserUpdateLeadTreatmentsInput {
  @Field(() => [UserUpdateLeadTreatmentInput], {nullable: true }) 
  leadTreatments: UserUpdateLeadTreatmentInput[]
}
