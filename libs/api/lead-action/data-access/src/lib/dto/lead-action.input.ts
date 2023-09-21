import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class LeadActionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string
}
