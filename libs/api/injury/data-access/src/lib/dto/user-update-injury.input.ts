import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLeadInjuryInput } from '@case-clinical/api/lead-injury/data-access' 


@InputType()
export class UserUpdateInjuryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateLeadInjuryInput], { nullable: true }) 
  leads?: UserUpdateLeadInjuryInput[]


}