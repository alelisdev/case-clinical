import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class UserCreateContactEmailInput {

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  contactId?: string


  @Field(() => UserCreateContactInput ,{ nullable: true }) 
  contact?: UserCreateContactInput  

}
