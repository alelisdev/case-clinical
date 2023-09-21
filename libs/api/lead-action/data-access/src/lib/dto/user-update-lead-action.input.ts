import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class UserUpdateLeadActionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string


  @Field(() => UserUpdateLeadInput ,{ nullable: true }) 
  lead?: UserUpdateLeadInput  

}