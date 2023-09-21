import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access' 


@ObjectType()
export class CaseType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  orderIndex?: number

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  removed?: boolean

  @Field({ nullable: true }) 
  migSource?: string

  @Field({ nullable: true }) 
  entity?: string

  @Field({ nullable: true }) 
  temp?: string

  @Field(() => [LegalCase], { nullable: true }) 
  legalCases?: LegalCase[]


}
