import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateMedicalConditionProviderInput } from './user-update-medical-condition-provider.input'

@InputType()
export class UserUpdateMedicalConditionProvidersInput {
  @Field(() => [UserUpdateMedicalConditionProviderInput], {nullable: true }) 
  medicalConditionProviders: UserUpdateMedicalConditionProviderInput[]
}
