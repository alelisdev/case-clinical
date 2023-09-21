import { Field, ObjectType } from '@nestjs/graphql'

import { Payment } from '@case-clinical/api/payment/data-access'

import { CaseAccount } from '@case-clinical/api/case-account/data-access'


@ObjectType()
export class CaseAccountPayment {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  amountApplied?: number

  @Field({ nullable: true }) 
  paymentId?: string

  @Field({ nullable: true }) 
  caseAccountId?: string


  @Field(() => Payment, { nullable: true }) 
  payment?: Payment  

  @Field(() => CaseAccount, { nullable: true }) 
  caseAccount?: CaseAccount  

}
