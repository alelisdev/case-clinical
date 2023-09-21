import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateRequiredFieldInput } from '@case-clinical/api/required-field/data-access' 


@InputType()
export class UserUpdateMedLevelInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  approvedSiteCosts?: number

  @Field({ nullable: true }) 
  maximumMedicalBillsToDate?: number

  @Field(() => [UserUpdateLegalCaseInput], { nullable: true }) 
  legalCases?: UserUpdateLegalCaseInput[]

  @Field(() => [UserUpdateRequiredFieldInput], { nullable: true }) 
  requireFields?: UserUpdateRequiredFieldInput[]


}