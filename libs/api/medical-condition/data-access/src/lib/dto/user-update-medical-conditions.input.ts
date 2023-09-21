import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateMedicalConditionInput } from './user-update-medical-condition.input'

@InputType()
export class UserUpdateMedicalConditionsInput {
  @Field(() => [UserUpdateMedicalConditionInput], {nullable: true }) 
  medicalConditions: UserUpdateMedicalConditionInput[]
}
