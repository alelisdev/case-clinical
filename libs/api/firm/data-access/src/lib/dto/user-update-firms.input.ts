import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateFirmInput } from './user-update-firm.input'

@InputType()
export class UserUpdateFirmsInput {
  @Field(() => [UserUpdateFirmInput], {nullable: true }) 
  firms: UserUpdateFirmInput[]
}
