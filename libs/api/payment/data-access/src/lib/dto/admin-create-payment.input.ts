import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateBatchControlInput } from '@case-clinical/api/batch-control/data-access' 
import { AdminCreateBankInput } from '@case-clinical/api/bank/data-access' 
import { AdminCreatePayorTypeInput } from '@case-clinical/api/payor-type/data-access' 
import { AdminCreatePaymentTypeInput } from '@case-clinical/api/payment-type/data-access' 
import { AdminCreatePaymentApplicationMethodInput } from '@case-clinical/api/payment-application-method/data-access' 
import { AdminCreateCaseAccountPaymentInput } from '@case-clinical/api/case-account-payment/data-access' 


@InputType()
export class AdminCreatePaymentInput {

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

  @Field(() => [AdminCreateCaseAccountPaymentInput], { nullable: true }) 
  caseAccountPayments?: AdminCreateCaseAccountPaymentInput[]


  @Field(() => AdminCreateBatchControlInput ,{ nullable: true }) 
  batchControl?: AdminCreateBatchControlInput  


  @Field(() => AdminCreateBankInput ,{ nullable: true }) 
  bank?: AdminCreateBankInput  


  @Field(() => AdminCreatePayorTypeInput ,{ nullable: true }) 
  payorType?: AdminCreatePayorTypeInput  


  @Field(() => AdminCreatePaymentTypeInput ,{ nullable: true }) 
  paymentType?: AdminCreatePaymentTypeInput  


  @Field(() => AdminCreatePaymentApplicationMethodInput ,{ nullable: true }) 
  paymentApplicationMethod?: AdminCreatePaymentApplicationMethodInput  

}