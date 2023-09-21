import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreateRequiredFieldInput } from '@case-clinical/api/required-field/data-access' 


@InputType()
export class UserCreateMedLevelInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  approvedSiteCosts?: number

  @Field({ nullable: true }) 
  maximumMedicalBillsToDate?: number

  @Field(() => [UserCreateLegalCaseInput], { nullable: true }) 
  legalCases?: UserCreateLegalCaseInput[]

  @Field(() => [UserCreateRequiredFieldInput], { nullable: true }) 
  requireFields?: UserCreateRequiredFieldInput[]


}
