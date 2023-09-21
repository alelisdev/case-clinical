import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLeadInjuryInput } from '@case-clinical/api/lead-injury/data-access' 


@InputType()
export class AdminCreateInjuryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateLeadInjuryInput], { nullable: true }) 
  leads?: AdminCreateLeadInjuryInput[]


}