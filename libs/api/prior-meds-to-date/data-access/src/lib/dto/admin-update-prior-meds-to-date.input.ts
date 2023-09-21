import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminUpdatePriorMedsToDateStatusInput } from '@case-clinical/api/prior-meds-to-date-status/data-access' 


@InputType()
export class AdminUpdatePriorMedsToDateInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  


  @Field(() => AdminUpdatePriorMedsToDateStatusInput ,{ nullable: true }) 
  priorMedsToDateStatus?: AdminUpdatePriorMedsToDateStatusInput  

}