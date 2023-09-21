import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCountryInput } from '@case-clinical/api/country/data-access' 
import { AdminCreateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class AdminCreateContactPhoneNumberInput {

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


  @Field(() => AdminCreateCountryInput ,{ nullable: true }) 
  country?: AdminCreateCountryInput  


  @Field(() => AdminCreateContactInput ,{ nullable: true }) 
  contact?: AdminCreateContactInput  

}