import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PriorMedsToDateInput {

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
}
