import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePaymentInput } from '@case-clinical/api/payment/data-access' 
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class UserUpdateCaseAccountPaymentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  amountApplied?: number

  @Field({ nullable: true }) 
  paymentId?: string

  @Field({ nullable: true }) 
  caseAccountId?: string


  @Field(() => UserUpdatePaymentInput ,{ nullable: true }) 
  payment?: UserUpdatePaymentInput  


  @Field(() => UserUpdateCaseAccountInput ,{ nullable: true }) 
  caseAccount?: UserUpdateCaseAccountInput  

}