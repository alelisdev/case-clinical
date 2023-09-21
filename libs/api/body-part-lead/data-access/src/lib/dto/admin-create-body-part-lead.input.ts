import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLeadInput } from '@case-clinical/api/lead/data-access' 
import { AdminCreateBodyPartInput } from '@case-clinical/api/body-part/data-access' 


@InputType()
export class AdminCreateBodyPartLeadInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string


  @Field(() => AdminCreateLeadInput ,{ nullable: true }) 
  lead?: AdminCreateLeadInput  


  @Field(() => AdminCreateBodyPartInput ,{ nullable: true }) 
  bodyPart?: AdminCreateBodyPartInput  

}