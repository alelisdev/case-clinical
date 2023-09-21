import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateBankInput } from './user-update-bank.input'

@InputType()
export class UserUpdateBanksInput {
  @Field(() => [UserUpdateBankInput], {nullable: true }) 
  banks: UserUpdateBankInput[]
}
