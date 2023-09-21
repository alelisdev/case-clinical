import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateImplantInput } from './user-update-implant.input'

@InputType()
export class UserUpdateImplantsInput {
  @Field(() => [UserUpdateImplantInput], {nullable: true }) 
  implants: UserUpdateImplantInput[]
}
