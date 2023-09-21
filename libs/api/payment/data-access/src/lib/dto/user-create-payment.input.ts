import { Field, InputType } from '@nestjs/graphql'

import { UserCreateBatchControlInput } from '@case-clinical/api/batch-control/data-access' 
import { UserCreateBankInput } from '@case-clinical/api/bank/data-access' 
import { UserCreatePayorTypeInput } from '@case-clinical/api/payor-type/data-access' 
import { UserCreatePaymentTypeInput } from '@case-clinical/api/payment-type/data-access' 
import { UserCreatePaymentApplicationMethodInput } from '@case-clinical/api/payment-application-method/data-access' 
import { UserCreateCaseAccountPaymentInput } from '@case-clinical/api/case-account-payment/data-access' 


@InputType()
export class UserCreatePaymentInput {

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

  @Field(() => [UserCreateCaseAccountPaymentInput], { nullable: true }) 
  caseAccountPayments?: UserCreateCaseAccountPaymentInput[]


  @Field(() => UserCreateBatchControlInput ,{ nullable: true }) 
  batchControl?: UserCreateBatchControlInput  


  @Field(() => UserCreateBankInput ,{ nullable: true }) 
  bank?: UserCreateBankInput  


  @Field(() => UserCreatePayorTypeInput ,{ nullable: true }) 
  payorType?: UserCreatePayorTypeInput  


  @Field(() => UserCreatePaymentTypeInput ,{ nullable: true }) 
  paymentType?: UserCreatePaymentTypeInput  


  @Field(() => UserCreatePaymentApplicationMethodInput ,{ nullable: true }) 
  paymentApplicationMethod?: UserCreatePaymentApplicationMethodInput  

}
