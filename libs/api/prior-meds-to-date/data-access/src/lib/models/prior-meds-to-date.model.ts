import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'

import { PriorMedsToDateStatus } from '@case-clinical/api/prior-meds-to-date-status/data-access'
import { Specialty } from '@case-clinical/api/specialty/data-access'
import { VisitKind } from '@case-clinical/api/visit-kind/data-access'


@ObjectType()
export class PriorMedsToDate {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

  @Field(() => PriorMedsToDateStatus, { nullable: true }) 
  priorMedsToDateStatus?: PriorMedsToDateStatus  

  @Field(() => Specialty, { nullable: true }) 
  specialty?: Specialty  

  @Field(() => VisitKind, { nullable: true }) 
  visitKind?: VisitKind  

}
