import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePaymentInput } from '@case-clinical/api/payment/data-access' 


@InputType()
export class UserCreateBatchControlInput {

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

  @Field(() => [UserCreatePaymentInput], { nullable: true }) 
  payments?: UserCreatePaymentInput[]


}
