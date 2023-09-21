import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRequiredFieldInput } from './user-update-required-field.input'

@InputType()
export class UserUpdateRequiredFieldsInput {
  @Field(() => [UserUpdateRequiredFieldInput], {nullable: true }) 
  requiredFields: UserUpdateRequiredFieldInput[]
}
