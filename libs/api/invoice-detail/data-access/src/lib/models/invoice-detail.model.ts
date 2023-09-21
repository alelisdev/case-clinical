import { Field, ObjectType } from '@nestjs/graphql'

import { Invoice } from '@case-clinical/api/invoice/data-access'
import { CaseAccount } from '@case-clinical/api/case-account/data-access' 


@ObjectType()
export class InvoiceDetail {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [CaseAccount], { nullable: true }) 
  caseAccounts?: CaseAccount[]


  @Field(() => Invoice, { nullable: true }) 
  invoice?: Invoice  

}
