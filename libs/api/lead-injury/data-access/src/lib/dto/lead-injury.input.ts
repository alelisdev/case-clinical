import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class LeadInjuryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string

  @Field({ nullable: true }) 
  severityId?: string

}
