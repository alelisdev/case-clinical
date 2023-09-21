import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePayorTypeInput } from './user-update-payor-type.input'

@InputType()
export class UserUpdatePayorTypesInput {
  @Field(() => [UserUpdatePayorTypeInput], {nullable: true }) 
  payorTypes: UserUpdatePayorTypeInput[]
}
