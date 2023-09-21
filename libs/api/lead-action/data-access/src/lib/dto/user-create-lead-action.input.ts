import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class UserCreateLeadActionInput {

  @Field({ nullable: true }) 
  id?: string
  
  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string


  @Field(() => UserCreateLeadInput ,{ nullable: true }) 
  lead?: UserCreateLeadInput  

}
