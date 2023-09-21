import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContactInput } from '@case-clinical/api/contact/data-access' 
import { UserUpdateIntegrationInput } from '@case-clinical/api/integration/data-access' 


@InputType()
export class UserUpdateContactSettingInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  value?: string

  @Field({ nullable: true }) 
  iconUrl?: string

  @Field({ nullable: true }) 
  properties?: string

  @Field({ nullable: true }) 
  contactId?: string

  @Field({ nullable: true }) 
  integrationId?: string


  @Field(() => UserUpdateContactInput ,{ nullable: true }) 
  contact?: UserUpdateContactInput  


  @Field(() => UserUpdateIntegrationInput ,{ nullable: true }) 
  integration?: UserUpdateIntegrationInput  

}