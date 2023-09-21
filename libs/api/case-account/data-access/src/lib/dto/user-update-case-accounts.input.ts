import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCaseAccountInput } from './user-update-case-account.input'

@InputType()
export class UserUpdateCaseAccountsInput {
  @Field(() => [UserUpdateCaseAccountInput], {nullable: true }) 
  caseAccounts: UserUpdateCaseAccountInput[]
}
