import { Field, ObjectType } from '@nestjs/graphql'

import { Contact } from '@case-clinical/api/contact/data-access'


@ObjectType()
export class ContactEmail {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  contactId?: string


  @Field(() => Contact, { nullable: true }) 
  contact?: Contact  

}
