import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PaymentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  paidOn?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  batchControlId?: string

  @Field({ nullable: true }) 
  bankId?: string

  @Field({ nullable: true }) 
  payorTypeId?: string

  @Field({ nullable: true }) 
  paymentTypeId?: string

  @Field({ nullable: true }) 
  amount?: number

  @Field({ nullable: true }) 
  collected?: number

  @Field({ nullable: true }) 
  dac?: number

  @Field({ nullable: true }) 
  isPartial?: boolean

  @Field({ nullable: true }) 
  dateReceived?: Date

  @Field({ nullable: true }) 
  memo?: string

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  securitizationGroup?: string

  @Field({ nullable: true }) 
  paymentApplicationMethodId?: string

}
