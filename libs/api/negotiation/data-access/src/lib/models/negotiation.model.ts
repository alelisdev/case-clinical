import { Field, ObjectType } from '@nestjs/graphql'

import { Contact } from '@case-clinical/api/contact/data-access'

import { Document } from '@case-clinical/api/document/data-access'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'

import { NegotiationKind } from '@case-clinical/api/negotiation-kind/data-access'

import { PartyKind } from '@case-clinical/api/party-kind/data-access'

import { ResponseKind } from '@case-clinical/api/response-kind/data-access'

import { YesNoUnknown } from '@case-clinical/api/yes-no-unknown/data-access'


@ObjectType()
export class Negotiation {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  negotiationKindId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  amount?: number

  @Field({ nullable: true }) 
  partyFromId?: string

  @Field({ nullable: true }) 
  partyToId?: string

  @Field({ nullable: true }) 
  dateServed?: Date

  @Field({ nullable: true }) 
  dueDate?: Date

  @Field({ nullable: true }) 
  dateCompleted?: Date

  @Field({ nullable: true }) 
  respondedToDemandId?: string

  @Field({ nullable: true }) 
  responseDate?: Date

  @Field({ nullable: true }) 
  responseKindId?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  attachmentId?: string

  @Field({ nullable: true }) 
  partyFromKindId?: string

  @Field({ nullable: true }) 
  partyToKindId?: string

  @Field(() => Contact, { nullable: true }) 
  partyFrom?: Contact  

  @Field(() => Contact, { nullable: true }) 
  partyTo?: Contact  

  @Field(() => Document, { nullable: true }) 
  attachment?: Document  

  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

  @Field(() => NegotiationKind, { nullable: true }) 
  negotiationKind?: NegotiationKind  

  @Field(() => PartyKind, { nullable: true }) 
  partyFromKind?: PartyKind  

  @Field(() => PartyKind, { nullable: true }) 
  partyToKind?: PartyKind  

  @Field(() => ResponseKind, { nullable: true }) 
  responseKind?: ResponseKind  

  @Field(() => YesNoUnknown, { nullable: true }) 
  respondedToDemand?: YesNoUnknown  

}
