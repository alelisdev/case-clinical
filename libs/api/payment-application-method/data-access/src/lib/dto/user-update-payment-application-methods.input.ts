import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePaymentApplicationMethodInput } from './user-update-payment-application-method.input'

@InputType()
export class UserUpdatePaymentApplicationMethodsInput {
  @Field(() => [UserUpdatePaymentApplicationMethodInput], {nullable: true }) 
  paymentApplicationMethods: UserUpdatePaymentApplicationMethodInput[]
}
