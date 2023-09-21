import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminCreateBalanceRequestInput {

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


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  statement?: AdminCreateDocumentInput  


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  

}