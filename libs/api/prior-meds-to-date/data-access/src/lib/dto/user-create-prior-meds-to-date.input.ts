import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreatePriorMedsToDateStatusInput } from '@case-clinical/api/prior-meds-to-date-status/data-access' 
import { UserCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access'
import { UserCreateVisitKindInput } from '@case-clinical/api/visit-kind/data-access'


@InputType()
export class UserCreatePriorMedsToDateInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  priorMedsToDateStatusId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  visitKindId?: string

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  amount?: number


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  


  @Field(() => UserCreatePriorMedsToDateStatusInput ,{ nullable: true }) 
  priorMedsToDateStatus?: UserCreatePriorMedsToDateStatusInput  


  @Field(() => UserCreateSpecialtyInput, { nullable: true }) 
  specialty?: UserCreateSpecialtyInput  

  @Field(() => UserCreateVisitKindInput, { nullable: true }) 
  visitKind?: UserCreateVisitKindInput  
}
