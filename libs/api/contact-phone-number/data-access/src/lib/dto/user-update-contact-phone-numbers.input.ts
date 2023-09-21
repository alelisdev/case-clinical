import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContactPhoneNumberInput } from './user-update-contact-phone-number.input'

@InputType()
export class UserUpdateContactPhoneNumbersInput {
  @Field(() => [UserUpdateContactPhoneNumberInput], {nullable: true }) 
  contactPhoneNumbers: UserUpdateContactPhoneNumberInput[]
}
