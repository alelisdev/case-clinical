import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCountryInput } from '@case-clinical/api/country/data-access' 
import { UserUpdateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class UserUpdateContactPhoneNumberInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => UserUpdateCountryInput ,{ nullable: true }) 
  country?: UserUpdateCountryInput  


  @Field(() => UserUpdateContactInput ,{ nullable: true }) 
  contact?: UserUpdateContactInput  

}