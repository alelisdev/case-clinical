import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'


@ObjectType()
export class CasePreProblem {

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
  sameRegion?: boolean

  @Field({ nullable: true }) 
  problemDate?: Date

  @Field({ nullable: true }) 
  duration?: string

  @Field({ nullable: true }) 
  symptoms?: string

  @Field({ nullable: true }) 
  regions?: string

  @Field({ nullable: true }) 
  removed?: boolean


  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

}
