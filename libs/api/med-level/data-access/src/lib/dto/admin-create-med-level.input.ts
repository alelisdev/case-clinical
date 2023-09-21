import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreateRequiredFieldInput } from '@case-clinical/api/required-field/data-access' 


@InputType()
export class AdminCreateMedLevelInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  approvedSiteCosts?: number

  @Field({ nullable: true }) 
  maximumMedicalBillsToDate?: number

  @Field(() => [AdminCreateLegalCaseInput], { nullable: true }) 
  legalCases?: AdminCreateLegalCaseInput[]

  @Field(() => [AdminCreateRequiredFieldInput], { nullable: true }) 
  requireFields?: AdminCreateRequiredFieldInput[]


}