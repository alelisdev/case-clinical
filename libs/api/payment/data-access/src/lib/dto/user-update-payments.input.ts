import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePaymentInput } from './user-update-payment.input'

@InputType()
export class UserUpdatePaymentsInput {
  @Field(() => [UserUpdatePaymentInput], {nullable: true }) 
  payments: UserUpdatePaymentInput[]
}
