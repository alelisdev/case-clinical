import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContactInput } from '@case-clinical/api/contact/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreateNegotiationKindInput } from '@case-clinical/api/negotiation-kind/data-access' 
import { AdminCreatePartyKindInput } from '@case-clinical/api/party-kind/data-access' 
import { AdminCreateResponseKindInput } from '@case-clinical/api/response-kind/data-access' 
import { AdminCreateYesNoUnknownInput } from '@case-clinical/api/yes-no-unknown/data-access' 


@InputType()
export class AdminCreateNegotiationInput {

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

  @Field(() => AdminCreateContactInput ,{ nullable: true }) 
  partyFrom?: AdminCreateContactInput  


  @Field(() => AdminCreateContactInput ,{ nullable: true }) 
  partyTo?: AdminCreateContactInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  attachment?: AdminCreateDocumentInput  


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  


  @Field(() => AdminCreateNegotiationKindInput ,{ nullable: true }) 
  negotiationKind?: AdminCreateNegotiationKindInput  


  @Field(() => AdminCreatePartyKindInput ,{ nullable: true }) 
  partyFromKind?: AdminCreatePartyKindInput  


  @Field(() => AdminCreatePartyKindInput ,{ nullable: true }) 
  partyToKind?: AdminCreatePartyKindInput  


  @Field(() => AdminCreateResponseKindInput ,{ nullable: true }) 
  responseKind?: AdminCreateResponseKindInput  


  @Field(() => AdminCreateYesNoUnknownInput ,{ nullable: true }) 
  respondedToDemand?: AdminCreateYesNoUnknownInput  

}