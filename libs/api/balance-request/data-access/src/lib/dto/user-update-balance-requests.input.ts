import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateBalanceRequestInput } from './user-update-balance-request.input'

@InputType()
export class UserUpdateBalanceRequestsInput {
  @Field(() => [UserUpdateBalanceRequestInput], {nullable: true }) 
  balanceRequests: UserUpdateBalanceRequestInput[]
}
