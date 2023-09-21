import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminUpdateCasePreProblemInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  

}