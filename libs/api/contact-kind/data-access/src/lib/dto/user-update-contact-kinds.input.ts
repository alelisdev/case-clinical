import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContactKindInput } from './user-update-contact-kind.input'

@InputType()
export class UserUpdateContactKindsInput {
  @Field(() => [UserUpdateContactKindInput], {nullable: true }) 
  contactKinds: UserUpdateContactKindInput[]
}
