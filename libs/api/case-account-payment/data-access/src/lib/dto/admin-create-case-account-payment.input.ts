import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePaymentInput } from '@case-clinical/api/payment/data-access' 
import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class AdminCreateCaseAccountPaymentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  amountApplied?: number

  @Field({ nullable: true }) 
  paymentId?: string

  @Field({ nullable: true }) 
  caseAccountId?: string


  @Field(() => AdminCreatePaymentInput ,{ nullable: true }) 
  payment?: AdminCreatePaymentInput  


  @Field(() => AdminCreateCaseAccountInput ,{ nullable: true }) 
  caseAccount?: AdminCreateCaseAccountInput  

}