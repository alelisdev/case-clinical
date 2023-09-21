import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class AdminUpdateLeadSourceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateLeadInput], { nullable: true }) 
  leads?: UserUpdateLeadInput[]


}