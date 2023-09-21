import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContactInput } from '@case-clinical/api/contact/data-access' 
import { UserCreateIntegrationInput } from '@case-clinical/api/integration/data-access' 


@InputType()
export class UserCreateContactSettingInput {

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


  @Field(() => UserCreateContactInput ,{ nullable: true }) 
  contact?: UserCreateContactInput  


  @Field(() => UserCreateIntegrationInput ,{ nullable: true }) 
  integration?: UserCreateIntegrationInput  

}
