import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminUpdateBalanceRequestInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  requestedOn?: Date

  @Field({ nullable: true }) 
  repliedOn?: Date

  @Field({ nullable: true }) 
  status?: string

  @Field({ nullable: true }) 
  statementId?: string

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  balanceAmount?: number

  @Field({ nullable: true }) 
  legalCaseId?: string


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  statement?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  

}