import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateInvoiceInput } from '@case-clinical/api/invoice/data-access' 
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class UserUpdateInvoiceDetailInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserUpdateCaseAccountInput[]


  @Field(() => UserUpdateInvoiceInput ,{ nullable: true }) 
  invoice?: UserUpdateInvoiceInput  

}