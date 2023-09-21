import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContactInput } from '@case-clinical/api/contact/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateNegotiationKindInput } from '@case-clinical/api/negotiation-kind/data-access' 
import { UserUpdatePartyKindInput } from '@case-clinical/api/party-kind/data-access' 
import { UserUpdateResponseKindInput } from '@case-clinical/api/response-kind/data-access' 
import { UserUpdateYesNoUnknownInput } from '@case-clinical/api/yes-no-unknown/data-access' 


@InputType()
export class UserUpdateNegotiationInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => UserUpdateContactInput ,{ nullable: true }) 
  partyFrom?: UserUpdateContactInput  


  @Field(() => UserUpdateContactInput ,{ nullable: true }) 
  partyTo?: UserUpdateContactInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  attachment?: UserUpdateDocumentInput  


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserUpdateLegalCaseInput  


  @Field(() => UserUpdateNegotiationKindInput ,{ nullable: true }) 
  negotiationKind?: UserUpdateNegotiationKindInput  


  @Field(() => UserUpdatePartyKindInput ,{ nullable: true }) 
  partyFromKind?: UserUpdatePartyKindInput  


  @Field(() => UserUpdatePartyKindInput ,{ nullable: true }) 
  partyToKind?: UserUpdatePartyKindInput  


  @Field(() => UserUpdateResponseKindInput ,{ nullable: true }) 
  responseKind?: UserUpdateResponseKindInput  


  @Field(() => UserUpdateYesNoUnknownInput ,{ nullable: true }) 
  respondedToDemand?: UserUpdateYesNoUnknownInput  

}