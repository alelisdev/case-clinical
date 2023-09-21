import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'


@ObjectType()
export class CasePreInjury {

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
  affectsInjury?: boolean

  @Field({ nullable: true }) 
  injuryDate?: string

  @Field({ nullable: true }) 
  injured?: string

  @Field({ nullable: true }) 
  anatomic?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  removed?: boolean


  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

}
