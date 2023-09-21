import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminUpdateTimeEntryInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  

}