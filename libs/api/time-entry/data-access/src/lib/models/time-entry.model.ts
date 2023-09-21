import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'


@ObjectType()
export class TimeEntry {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  date?: Date

  @Field({ nullable: true }) 
  rate?: number

  @Field({ nullable: true }) 
  hours?: number

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  isBilled?: boolean

  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

}
