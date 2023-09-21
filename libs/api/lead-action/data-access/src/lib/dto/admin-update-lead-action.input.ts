import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class AdminUpdateLeadActionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string


  @Field(() => AdminUpdateLeadInput ,{ nullable: true }) 
  lead?: AdminUpdateLeadInput  

}