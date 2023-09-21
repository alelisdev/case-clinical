import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAccountStatusInput } from './user-update-account-status.input'

@InputType()
export class UserUpdateAccountStatusesInput {
  @Field(() => [UserUpdateAccountStatusInput], {nullable: true }) 
  accountStatuses: UserUpdateAccountStatusInput[]
}
