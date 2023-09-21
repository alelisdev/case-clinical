import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserCreateCaseProgressStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateLegalCaseInput], { nullable: true }) 
  legalCases?: UserCreateLegalCaseInput[]


}
