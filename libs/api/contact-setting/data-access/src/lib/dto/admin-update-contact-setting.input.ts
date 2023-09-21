import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateContactInput } from '@case-clinical/api/contact/data-access' 
import { AdminUpdateIntegrationInput } from '@case-clinical/api/integration/data-access' 


@InputType()
export class AdminUpdateContactSettingInput {

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


  @Field(() => AdminUpdateContactInput ,{ nullable: true }) 
  contact?: AdminUpdateContactInput  


  @Field(() => AdminUpdateIntegrationInput ,{ nullable: true }) 
  integration?: AdminUpdateIntegrationInput  

}