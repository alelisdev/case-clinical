import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateCountryInput } from '@case-clinical/api/country/data-access' 
import { AdminUpdateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class AdminUpdateContactPhoneNumberInput {

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


  @Field(() => AdminUpdateCountryInput ,{ nullable: true }) 
  country?: AdminUpdateCountryInput  


  @Field(() => AdminUpdateContactInput ,{ nullable: true }) 
  contact?: AdminUpdateContactInput  

}