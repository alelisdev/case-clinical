import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePaymentInput } from '@case-clinical/api/payment/data-access' 


@InputType()
export class AdminCreatePaymentTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreatePaymentInput], { nullable: true }) 
  payments?: AdminCreatePaymentInput[]


}