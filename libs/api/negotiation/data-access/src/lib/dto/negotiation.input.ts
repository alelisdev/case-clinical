import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class NegotiationInput {

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
}
