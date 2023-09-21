import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class AdminUpdateContactTagInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  contactId?: string


  @Field(() => AdminUpdateContactInput ,{ nullable: true }) 
  contact?: AdminUpdateContactInput  

}