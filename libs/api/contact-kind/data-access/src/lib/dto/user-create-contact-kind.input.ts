import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class UserCreateContactKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateContactInput], { nullable: true }) 
  contacts?: UserCreateContactInput[]


}
