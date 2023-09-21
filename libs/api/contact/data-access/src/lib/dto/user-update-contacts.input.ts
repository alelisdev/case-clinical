import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContactInput } from './user-update-contact.input'

@InputType()
export class UserUpdateContactsInput {
  @Field(() => [UserUpdateContactInput], {nullable: true }) 
  contacts: UserUpdateContactInput[]
}
