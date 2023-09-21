import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreatePriorMedsToDateStatusInput } from '@case-clinical/api/prior-meds-to-date-status/data-access' 


@InputType()
export class AdminCreatePriorMedsToDateInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  priorMedsToDateStatusId?: string

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  amount?: number


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  


  @Field(() => AdminCreatePriorMedsToDateStatusInput ,{ nullable: true }) 
  priorMedsToDateStatus?: AdminCreatePriorMedsToDateStatusInput  

}