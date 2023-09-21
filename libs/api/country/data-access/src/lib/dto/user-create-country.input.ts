import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContactPhoneNumberInput } from '@case-clinical/api/contact-phone-number/data-access' 


@InputType()
export class UserCreateCountryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  iso?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  flagImagePos?: string

  @Field(() => [UserCreateContactPhoneNumberInput], { nullable: true }) 
  contactPhoneNumbers?: UserCreateContactPhoneNumberInput[]


}
