import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateManufacturerInput } from './user-update-manufacturer.input'

@InputType()
export class UserUpdateManufacturersInput {
  @Field(() => [UserUpdateManufacturerInput], {nullable: true }) 
  manufacturers: UserUpdateManufacturerInput[]
}
