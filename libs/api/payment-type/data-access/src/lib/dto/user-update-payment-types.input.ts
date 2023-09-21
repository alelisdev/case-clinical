import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePaymentTypeInput } from './user-update-payment-type.input'

@InputType()
export class UserUpdatePaymentTypesInput {
  @Field(() => [UserUpdatePaymentTypeInput], {nullable: true }) 
  paymentTypes: UserUpdatePaymentTypeInput[]
}
