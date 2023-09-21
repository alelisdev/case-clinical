import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserCreateCaseTypeInput {

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

  @Field(() => [UserCreateLegalCaseInput], { nullable: true }) 
  legalCases?: UserCreateLegalCaseInput[]


}
