import { Field, ObjectType } from '@nestjs/graphql'

import { Country } from '@case-clinical/api/country/data-access'

import { Contact } from '@case-clinical/api/contact/data-access'


@ObjectType()
export class ContactPhoneNumber {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  countryId?: string

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  label?: string

  @Field({ nullable: true }) 
  contactId?: string


  @Field(() => Country, { nullable: true }) 
  country?: Country  

  @Field(() => Contact, { nullable: true }) 
  contact?: Contact  

}
