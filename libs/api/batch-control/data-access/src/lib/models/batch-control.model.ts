import { Field, ObjectType } from '@nestjs/graphql'

import { Payment } from '@case-clinical/api/payment/data-access' 


@ObjectType()
export class BatchControl {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [Payment], { nullable: true }) 
  payments?: Payment[]


}
