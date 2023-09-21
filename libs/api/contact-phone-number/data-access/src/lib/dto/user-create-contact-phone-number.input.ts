import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCountryInput } from '@case-clinical/api/country/data-access' 
import { UserCreateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class UserCreateContactPhoneNumberInput {

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


  @Field(() => UserCreateCountryInput ,{ nullable: true }) 
  country?: UserCreateCountryInput  


  @Field(() => UserCreateContactInput ,{ nullable: true }) 
  contact?: UserCreateContactInput  

}
