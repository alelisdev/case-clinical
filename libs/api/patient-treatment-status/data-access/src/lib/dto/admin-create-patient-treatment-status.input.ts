import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminCreatePatientTreatmentStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateLegalCaseInput], { nullable: true }) 
  legalCases?: AdminCreateLegalCaseInput[]


}