import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLocationInput } from './user-update-location.input'

@InputType()
export class UserUpdateLocationsInput {
  @Field(() => [UserUpdateLocationInput], {nullable: true }) 
  locations: UserUpdateLocationInput[]
}
