import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCaseAccountPaymentInput } from './user-update-case-account-payment.input'

@InputType()
export class UserUpdateCaseAccountPaymentsInput {
  @Field(() => [UserUpdateCaseAccountPaymentInput], {nullable: true }) 
  caseAccountPayments: UserUpdateCaseAccountPaymentInput[]
}
