import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLeadInput } from '@case-clinical/api/lead/data-access' 
import { UserCreateBodyPartInput } from '@case-clinical/api/body-part/data-access' 


@InputType()
export class UserCreateBodyPartLeadInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string


  @Field(() => UserCreateLeadInput ,{ nullable: true }) 
  lead?: UserCreateLeadInput  


  @Field(() => UserCreateBodyPartInput ,{ nullable: true }) 
  bodyPart?: UserCreateBodyPartInput  

}
