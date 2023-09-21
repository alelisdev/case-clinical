import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLeadInput } from '@case-clinical/api/lead/data-access' 
import { AdminUpdateSeverityInput } from '@case-clinical/api/severity/data-access' 
import { UserUpdateInjuryInput } from '@case-clinical/api/injury/data-access' 


@InputType()
export class AdminUpdateLeadInjuryInput {

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

  @Field(() => [UserUpdateInjuryInput], { nullable: true }) 
  injuries?: UserUpdateInjuryInput[]


  @Field(() => AdminUpdateLeadInput ,{ nullable: true }) 
  lead?: AdminUpdateLeadInput  


  @Field(() => AdminUpdateSeverityInput ,{ nullable: true }) 
  severity?: AdminUpdateSeverityInput  

}