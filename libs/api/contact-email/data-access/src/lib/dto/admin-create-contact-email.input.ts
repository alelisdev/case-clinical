import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class AdminCreateContactEmailInput {

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  contactId?: string


  @Field(() => AdminCreateContactInput ,{ nullable: true }) 
  contact?: AdminCreateContactInput  

}