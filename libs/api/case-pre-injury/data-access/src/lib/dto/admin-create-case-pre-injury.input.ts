import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminCreateCasePreInjuryInput {

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


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  

}