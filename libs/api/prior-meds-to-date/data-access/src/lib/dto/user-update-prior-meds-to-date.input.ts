import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdatePriorMedsToDateStatusInput } from '@case-clinical/api/prior-meds-to-date-status/data-access' 
import { UserUpdateVisitKindInput } from '@case-clinical/api/visit-kind/data-access'
import { UserUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access'


@InputType()
export class UserUpdatePriorMedsToDateInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserUpdateLegalCaseInput  


  @Field(() => UserUpdatePriorMedsToDateStatusInput ,{ nullable: true }) 
  priorMedsToDateStatus?: UserUpdatePriorMedsToDateStatusInput  

  @Field(() => UserUpdateSpecialtyInput, { nullable: true }) 
  specialty?: UserUpdateSpecialtyInput  

  @Field(() => UserUpdateVisitKindInput, { nullable: true }) 
  visitKind?: UserUpdateVisitKindInput  
}