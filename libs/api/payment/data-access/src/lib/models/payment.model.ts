import { Field, ObjectType } from '@nestjs/graphql'

import { BatchControl } from '@case-clinical/api/batch-control/data-access'

import { Bank } from '@case-clinical/api/bank/data-access'

import { PayorType } from '@case-clinical/api/payor-type/data-access'

import { PaymentType } from '@case-clinical/api/payment-type/data-access'

import { PaymentApplicationMethod } from '@case-clinical/api/payment-application-method/data-access'
import { CaseAccountPayment } from '@case-clinical/api/case-account-payment/data-access' 


@ObjectType()
export class Payment {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [CaseAccountPayment], { nullable: true }) 
  caseAccountPayments?: CaseAccountPayment[]


  @Field(() => BatchControl, { nullable: true }) 
  batchControl?: BatchControl  

  @Field(() => Bank, { nullable: true }) 
  bank?: Bank  

  @Field(() => PayorType, { nullable: true }) 
  payorType?: PayorType  

  @Field(() => PaymentType, { nullable: true }) 
  paymentType?: PaymentType  

  @Field(() => PaymentApplicationMethod, { nullable: true }) 
  paymentApplicationMethod?: PaymentApplicationMethod  

}
