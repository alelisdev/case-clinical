import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePaymentInput } from '@case-clinical/api/payment/data-access' 


@InputType()
export class AdminUpdatePayorTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdatePaymentInput], { nullable: true }) 
  payments?: UserUpdatePaymentInput[]


}