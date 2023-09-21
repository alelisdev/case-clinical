import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreateRequiredFieldInput } from '@case-clinical/api/required-field/data-access' 


@InputType()
export class AdminCreateAccidentTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateLegalCaseInput], { nullable: true }) 
  legalCases?: AdminCreateLegalCaseInput[]

  @Field(() => [AdminCreateRequiredFieldInput], { nullable: true }) 
  requiredFields?: AdminCreateRequiredFieldInput[]


}