import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListNegotiationInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  partyFromId?: string  


  @Field({ nullable: true }) 
  partyToId?: string  


  @Field({ nullable: true }) 
  attachmentId?: string  


  @Field({ nullable: true }) 
  legalCaseId?: string  


  @Field({ nullable: true }) 
  negotiationKindId?: string  


  @Field({ nullable: true }) 
  partyFromKindId?: string  


  @Field({ nullable: true }) 
  partyToKindId?: string  


  @Field({ nullable: true }) 
  responseKindId?: string  


  @Field({ nullable: true }) 
  respondedToDemandId?: string  



  @Field({ nullable: true }) 
  contactId?: string  


  @Field({ nullable: true }) 
  documentId?: string  


  @Field({ nullable: true }) 
  partyKindId?: string  


  @Field({ nullable: true }) 
  yesNoUnknownId?: string  

}
