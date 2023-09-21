import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateContactInput } from '@case-clinical/api/contact/data-access' 
import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminUpdateNegotiationKindInput } from '@case-clinical/api/negotiation-kind/data-access' 
import { AdminUpdatePartyKindInput } from '@case-clinical/api/party-kind/data-access' 
import { AdminUpdateResponseKindInput } from '@case-clinical/api/response-kind/data-access' 
import { AdminUpdateYesNoUnknownInput } from '@case-clinical/api/yes-no-unknown/data-access' 


@InputType()
export class AdminUpdateNegotiationInput {

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

  @Field(() => AdminUpdateContactInput ,{ nullable: true }) 
  partyFrom?: AdminUpdateContactInput  


  @Field(() => AdminUpdateContactInput ,{ nullable: true }) 
  partyTo?: AdminUpdateContactInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  attachment?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  


  @Field(() => AdminUpdateNegotiationKindInput ,{ nullable: true }) 
  negotiationKind?: AdminUpdateNegotiationKindInput  


  @Field(() => AdminUpdatePartyKindInput ,{ nullable: true }) 
  partyFromKind?: AdminUpdatePartyKindInput  


  @Field(() => AdminUpdatePartyKindInput ,{ nullable: true }) 
  partyToKind?: AdminUpdatePartyKindInput  


  @Field(() => AdminUpdateResponseKindInput ,{ nullable: true }) 
  responseKind?: AdminUpdateResponseKindInput  


  @Field(() => AdminUpdateYesNoUnknownInput ,{ nullable: true }) 
  respondedToDemand?: AdminUpdateYesNoUnknownInput  

}