import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePaymentInput } from '@case-clinical/api/payment/data-access' 


@InputType()
export class AdminUpdateBatchControlInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdatePaymentInput], { nullable: true }) 
  payments?: UserUpdatePaymentInput[]


}