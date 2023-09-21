import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContactInput } from '@case-clinical/api/contact/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreateNegotiationKindInput } from '@case-clinical/api/negotiation-kind/data-access' 
import { UserCreatePartyKindInput } from '@case-clinical/api/party-kind/data-access' 
import { UserCreateResponseKindInput } from '@case-clinical/api/response-kind/data-access' 
import { UserCreateYesNoUnknownInput } from '@case-clinical/api/yes-no-unknown/data-access' 


@InputType()
export class UserCreateNegotiationInput {

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

  @Field(() => UserCreateContactInput ,{ nullable: true }) 
  partyFrom?: UserCreateContactInput  


  @Field(() => UserCreateContactInput ,{ nullable: true }) 
  partyTo?: UserCreateContactInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  attachment?: UserCreateDocumentInput  


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  


  @Field(() => UserCreateNegotiationKindInput ,{ nullable: true }) 
  negotiationKind?: UserCreateNegotiationKindInput  


  @Field(() => UserCreatePartyKindInput ,{ nullable: true }) 
  partyFromKind?: UserCreatePartyKindInput  


  @Field(() => UserCreatePartyKindInput ,{ nullable: true }) 
  partyToKind?: UserCreatePartyKindInput  


  @Field(() => UserCreateResponseKindInput ,{ nullable: true }) 
  responseKind?: UserCreateResponseKindInput  


  @Field(() => UserCreateYesNoUnknownInput ,{ nullable: true }) 
  respondedToDemand?: UserCreateYesNoUnknownInput  

}
