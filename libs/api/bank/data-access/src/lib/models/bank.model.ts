import { Field, ObjectType } from '@nestjs/graphql'

import { Payment } from '@case-clinical/api/payment/data-access' 


@ObjectType()
export class Bank {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Payment], { nullable: true }) 
  payments?: Payment[]


}
