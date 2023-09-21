import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContactPhoneNumberInput } from '@case-clinical/api/contact-phone-number/data-access' 


@InputType()
export class UserUpdateCountryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  iso?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  flagImagePos?: string

  @Field(() => [UserUpdateContactPhoneNumberInput], { nullable: true }) 
  contactPhoneNumbers?: UserUpdateContactPhoneNumberInput[]


}