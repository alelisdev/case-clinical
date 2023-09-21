import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLeadInput } from '@case-clinical/api/lead/data-access' 
import { UserUpdateBodyPartInput } from '@case-clinical/api/body-part/data-access' 


@InputType()
export class UserUpdateBodyPartLeadInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string


  @Field(() => UserUpdateLeadInput ,{ nullable: true }) 
  lead?: UserUpdateLeadInput  


  @Field(() => UserUpdateBodyPartInput ,{ nullable: true }) 
  bodyPart?: UserUpdateBodyPartInput  

}