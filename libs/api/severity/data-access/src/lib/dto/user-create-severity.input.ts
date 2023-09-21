import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLeadInjuryInput } from '@case-clinical/api/lead-injury/data-access' 


@InputType()
export class UserCreateSeverityInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateLeadInjuryInput], { nullable: true }) 
  leads?: UserCreateLeadInjuryInput[]


}
