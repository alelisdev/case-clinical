import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateInvoiceInput } from '@case-clinical/api/invoice/data-access' 
import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class AdminCreateInvoiceDetailInput {

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

  @Field(() => [AdminCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: AdminCreateCaseAccountInput[]


  @Field(() => AdminCreateInvoiceInput ,{ nullable: true }) 
  invoice?: AdminCreateInvoiceInput  

}