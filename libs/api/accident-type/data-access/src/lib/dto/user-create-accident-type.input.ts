import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreateRequiredFieldInput } from '@case-clinical/api/required-field/data-access' 


@InputType()
export class UserCreateAccidentTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateLegalCaseInput], { nullable: true }) 
  legalCases?: UserCreateLegalCaseInput[]

  @Field(() => [UserCreateRequiredFieldInput], { nullable: true }) 
  requiredFields?: UserCreateRequiredFieldInput[]


}
