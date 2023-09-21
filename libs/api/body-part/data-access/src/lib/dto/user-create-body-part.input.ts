import { Field, InputType } from '@nestjs/graphql'

import { UserCreateBodyPartLeadInput } from '@case-clinical/api/body-part-lead/data-access' 


@InputType()
export class UserCreateBodyPartInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateBodyPartLeadInput], { nullable: true }) 
  leads?: UserCreateBodyPartLeadInput[]


}
