import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContactPhoneNumberInput } from '@case-clinical/api/contact-phone-number/data-access' 


@InputType()
export class AdminCreateCountryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  iso?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  flagImagePos?: string

  @Field(() => [AdminCreateContactPhoneNumberInput], { nullable: true }) 
  contactPhoneNumbers?: AdminCreateContactPhoneNumberInput[]


}