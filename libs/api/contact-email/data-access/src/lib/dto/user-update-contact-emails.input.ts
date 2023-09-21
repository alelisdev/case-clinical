import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContactEmailInput } from './user-update-contact-email.input'

@InputType()
export class UserUpdateContactEmailsInput {
  @Field(() => [UserUpdateContactEmailInput], {nullable: true }) 
  contactEmails: UserUpdateContactEmailInput[]
}
