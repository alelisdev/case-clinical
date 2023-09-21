import { Field, ObjectType } from '@nestjs/graphql'

import { Contact } from '@case-clinical/api/contact/data-access'

import { Integration } from '@case-clinical/api/integration/data-access'


@ObjectType()
export class ContactSetting {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => Contact, { nullable: true }) 
  contact?: Contact  

  @Field(() => Integration, { nullable: true }) 
  integration?: Integration  

}
