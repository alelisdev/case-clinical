import { Field, InputType } from '@nestjs/graphql'

import { UserCreateInvoiceInput } from '@case-clinical/api/invoice/data-access' 
import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class UserCreateInvoiceDetailInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  invoiceId?: string

  @Field({ nullable: true }) 
  dateOfService?: Date

  @Field({ nullable: true }) 
  providerName?: string

  @Field({ nullable: true }) 
  procedureDescription?: string

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  charges?: number

  @Field({ nullable: true }) 
  lineTotal?: number

  @Field(() => [UserCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserCreateCaseAccountInput[]


  @Field(() => UserCreateInvoiceInput ,{ nullable: true }) 
  invoice?: UserCreateInvoiceInput  

}
