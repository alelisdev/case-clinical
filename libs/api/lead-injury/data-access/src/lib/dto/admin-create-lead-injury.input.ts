import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLeadInput } from '@case-clinical/api/lead/data-access' 
import { AdminCreateSeverityInput } from '@case-clinical/api/severity/data-access' 
import { AdminCreateInjuryInput } from '@case-clinical/api/injury/data-access' 


@InputType()
export class AdminCreateLeadInjuryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string

  @Field({ nullable: true }) 
  severityId?: string

  @Field(() => [AdminCreateInjuryInput], { nullable: true }) 
  injuries?: AdminCreateInjuryInput[]


  @Field(() => AdminCreateLeadInput ,{ nullable: true }) 
  lead?: AdminCreateLeadInput  


  @Field(() => AdminCreateSeverityInput ,{ nullable: true }) 
  severity?: AdminCreateSeverityInput  

}