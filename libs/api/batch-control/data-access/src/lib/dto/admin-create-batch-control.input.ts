import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePaymentInput } from '@case-clinical/api/payment/data-access' 


@InputType()
export class AdminCreateBatchControlInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  trackingNumber?: string

  @Field({ nullable: true }) 
  batchTotal?: number

  @Field({ nullable: true }) 
  defaultGLCode?: string

  @Field({ nullable: true }) 
  posted?: boolean

  @Field(() => [AdminCreatePaymentInput], { nullable: true }) 
  payments?: AdminCreatePaymentInput[]


}