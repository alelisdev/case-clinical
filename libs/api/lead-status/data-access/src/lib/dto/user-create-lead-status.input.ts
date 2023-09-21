import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class UserCreateLeadStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateLeadInput], { nullable: true }) 
  leads?: UserCreateLeadInput[]


}
