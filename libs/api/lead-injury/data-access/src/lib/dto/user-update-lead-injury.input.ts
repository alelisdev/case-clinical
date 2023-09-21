import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLeadInput } from '@case-clinical/api/lead/data-access' 
import { UserUpdateSeverityInput } from '@case-clinical/api/severity/data-access' 
import { UserUpdateInjuryInput } from '@case-clinical/api/injury/data-access' 


@InputType()
export class UserUpdateLeadInjuryInput {

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


  @Field(() => UserUpdateLeadInput ,{ nullable: true }) 
  lead?: UserUpdateLeadInput  


  @Field(() => UserUpdateSeverityInput ,{ nullable: true }) 
  severity?: UserUpdateSeverityInput  

}