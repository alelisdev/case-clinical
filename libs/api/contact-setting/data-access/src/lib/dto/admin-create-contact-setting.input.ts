import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContactInput } from '@case-clinical/api/contact/data-access' 
import { AdminCreateIntegrationInput } from '@case-clinical/api/integration/data-access' 


@InputType()
export class AdminCreateContactSettingInput {

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


  @Field(() => AdminCreateContactInput ,{ nullable: true }) 
  contact?: AdminCreateContactInput  


  @Field(() => AdminCreateIntegrationInput ,{ nullable: true }) 
  integration?: AdminCreateIntegrationInput  

}