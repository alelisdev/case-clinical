import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAccidentTypeInput } from './user-update-accident-type.input'

@InputType()
export class UserUpdateAccidentTypesInput {
  @Field(() => [UserUpdateAccidentTypeInput], {nullable: true }) 
  accidentTypes: UserUpdateAccidentTypeInput[]
}
