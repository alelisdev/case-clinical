import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserCreateAdverseInsuranceStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateLegalCaseInput], { nullable: true }) 
  legalCases?: UserCreateLegalCaseInput[]


}
