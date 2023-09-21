import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateBodyPartLeadInput } from '@case-clinical/api/body-part-lead/data-access' 


@InputType()
export class UserUpdateBodyPartInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateBodyPartLeadInput], { nullable: true }) 
  leads?: UserUpdateBodyPartLeadInput[]


}