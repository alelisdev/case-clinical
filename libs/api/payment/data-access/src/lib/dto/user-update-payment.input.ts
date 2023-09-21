import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateBatchControlInput } from '@case-clinical/api/batch-control/data-access' 
import { UserUpdateBankInput } from '@case-clinical/api/bank/data-access' 
import { UserUpdatePayorTypeInput } from '@case-clinical/api/payor-type/data-access' 
import { UserUpdatePaymentTypeInput } from '@case-clinical/api/payment-type/data-access' 
import { UserUpdatePaymentApplicationMethodInput } from '@case-clinical/api/payment-application-method/data-access' 
import { UserUpdateCaseAccountPaymentInput } from '@case-clinical/api/case-account-payment/data-access' 


@InputType()
export class UserUpdatePaymentInput {

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

  @Field(() => [UserUpdateCaseAccountPaymentInput], { nullable: true }) 
  caseAccountPayments?: UserUpdateCaseAccountPaymentInput[]


  @Field(() => UserUpdateBatchControlInput ,{ nullable: true }) 
  batchControl?: UserUpdateBatchControlInput  


  @Field(() => UserUpdateBankInput ,{ nullable: true }) 
  bank?: UserUpdateBankInput  


  @Field(() => UserUpdatePayorTypeInput ,{ nullable: true }) 
  payorType?: UserUpdatePayorTypeInput  


  @Field(() => UserUpdatePaymentTypeInput ,{ nullable: true }) 
  paymentType?: UserUpdatePaymentTypeInput  


  @Field(() => UserUpdatePaymentApplicationMethodInput ,{ nullable: true }) 
  paymentApplicationMethod?: UserUpdatePaymentApplicationMethodInput  

}