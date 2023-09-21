import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdatePaymentInput } from '@case-clinical/api/payment/data-access' 
import { AdminUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class AdminUpdateCaseAccountPaymentInput {

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


  @Field(() => AdminUpdatePaymentInput ,{ nullable: true }) 
  payment?: AdminUpdatePaymentInput  


  @Field(() => AdminUpdateCaseAccountInput ,{ nullable: true }) 
  caseAccount?: AdminUpdateCaseAccountInput  

}