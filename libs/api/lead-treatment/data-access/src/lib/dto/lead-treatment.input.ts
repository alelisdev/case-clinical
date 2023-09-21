import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class LeadTreatmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  treatmentId?: string
}
