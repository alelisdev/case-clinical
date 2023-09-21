import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLeadInput } from '@case-clinical/api/lead/data-access' 
import { UserCreateSeverityInput } from '@case-clinical/api/severity/data-access' 
import { UserCreateInjuryInput } from '@case-clinical/api/injury/data-access' 


@InputType()
export class UserCreateLeadInjuryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string

  @Field({ nullable: true }) 
  severityId?: string

  @Field(() => [UserCreateInjuryInput], { nullable: true }) 
  injuries?: UserCreateInjuryInput[]


  @Field(() => UserCreateLeadInput ,{ nullable: true }) 
  lead?: UserCreateLeadInput  


  @Field(() => UserCreateSeverityInput ,{ nullable: true }) 
  severity?: UserCreateSeverityInput  

}
