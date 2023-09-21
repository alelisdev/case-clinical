import { Field, InputType } from '@nestjs/graphql'

import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserCreateBalanceRequestInput {

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


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  statement?: UserCreateDocumentInput  


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  

}
