import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserUpdateTimeEntryInput {

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

  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserUpdateLegalCaseInput  

}