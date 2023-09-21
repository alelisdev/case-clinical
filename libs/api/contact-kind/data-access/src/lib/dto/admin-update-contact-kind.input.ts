import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class AdminUpdateContactKindInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateContactInput], { nullable: true }) 
  contacts?: UserUpdateContactInput[]


}