import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserUpdateAdverseInsuranceStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateLegalCaseInput], { nullable: true }) 
  legalCases?: UserUpdateLegalCaseInput[]


}