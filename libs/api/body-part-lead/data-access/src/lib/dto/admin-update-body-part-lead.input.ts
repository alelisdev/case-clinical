import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLeadInput } from '@case-clinical/api/lead/data-access' 
import { AdminUpdateBodyPartInput } from '@case-clinical/api/body-part/data-access' 


@InputType()
export class AdminUpdateBodyPartLeadInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string


  @Field(() => AdminUpdateLeadInput ,{ nullable: true }) 
  lead?: AdminUpdateLeadInput  


  @Field(() => AdminUpdateBodyPartInput ,{ nullable: true }) 
  bodyPart?: AdminUpdateBodyPartInput  

}