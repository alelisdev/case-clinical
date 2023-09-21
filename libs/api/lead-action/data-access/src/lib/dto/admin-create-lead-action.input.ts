import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class AdminCreateLeadActionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string


  @Field(() => AdminCreateLeadInput ,{ nullable: true }) 
  lead?: AdminCreateLeadInput  

}