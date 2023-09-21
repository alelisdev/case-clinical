import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateBatchControlInput } from '@case-clinical/api/batch-control/data-access' 
import { AdminUpdateBankInput } from '@case-clinical/api/bank/data-access' 
import { AdminUpdatePayorTypeInput } from '@case-clinical/api/payor-type/data-access' 
import { AdminUpdatePaymentTypeInput } from '@case-clinical/api/payment-type/data-access' 
import { AdminUpdatePaymentApplicationMethodInput } from '@case-clinical/api/payment-application-method/data-access' 
import { UserUpdateCaseAccountPaymentInput } from '@case-clinical/api/case-account-payment/data-access' 


@InputType()
export class AdminUpdatePaymentInput {

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


  @Field(() => AdminUpdateBatchControlInput ,{ nullable: true }) 
  batchControl?: AdminUpdateBatchControlInput  


  @Field(() => AdminUpdateBankInput ,{ nullable: true }) 
  bank?: AdminUpdateBankInput  


  @Field(() => AdminUpdatePayorTypeInput ,{ nullable: true }) 
  payorType?: AdminUpdatePayorTypeInput  


  @Field(() => AdminUpdatePaymentTypeInput ,{ nullable: true }) 
  paymentType?: AdminUpdatePaymentTypeInput  


  @Field(() => AdminUpdatePaymentApplicationMethodInput ,{ nullable: true }) 
  paymentApplicationMethod?: AdminUpdatePaymentApplicationMethodInput  

}