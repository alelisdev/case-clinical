import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePaymentInput } from '@case-clinical/api/payment/data-access' 
import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class UserCreateCaseAccountPaymentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  amountApplied?: number

  @Field({ nullable: true }) 
  paymentId?: string

  @Field({ nullable: true }) 
  caseAccountId?: string


  @Field(() => UserCreatePaymentInput ,{ nullable: true }) 
  payment?: UserCreatePaymentInput  


  @Field(() => UserCreateCaseAccountInput ,{ nullable: true }) 
  caseAccount?: UserCreateCaseAccountInput  

}
