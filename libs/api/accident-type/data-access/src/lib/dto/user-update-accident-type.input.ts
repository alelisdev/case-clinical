import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateRequiredFieldInput } from '@case-clinical/api/required-field/data-access' 


@InputType()
export class UserUpdateAccidentTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateLegalCaseInput], { nullable: true }) 
  legalCases?: UserUpdateLegalCaseInput[]

  @Field(() => [UserUpdateRequiredFieldInput], { nullable: true }) 
  requiredFields?: UserUpdateRequiredFieldInput[]


}