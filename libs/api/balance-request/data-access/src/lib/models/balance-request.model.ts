import { Field, ObjectType } from '@nestjs/graphql'

import { Document } from '@case-clinical/api/document/data-access'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'


@ObjectType()
export class BalanceRequest {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => Document, { nullable: true }) 
  statement?: Document  

  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

}
